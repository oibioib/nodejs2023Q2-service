import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  _SecretKey: string;
  _SecretRefreshKey: string;
  _TokenExpireTime: string;
  _TokenRefreshExpireTime: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: JwtService,
  ) {
    this._SecretKey = this.configService.get('JWT_SECRET_KEY') as string;
    this._SecretRefreshKey = this.configService.get(
      'JWT_SECRET_REFRESH_KEY',
    ) as string;
    this._TokenExpireTime = this.configService.get(
      'TOKEN_EXPIRE_TIME',
    ) as string;
    this._TokenRefreshExpireTime = this.configService.get(
      'TOKEN_REFRESH_EXPIRE_TIME',
    ) as string;
  }

  async getAuthToken(payload: object) {
    const settings = {
      secret: this._SecretKey,
      expiresIn: this._TokenExpireTime,
    };

    const token = await this.tokenService.signAsync(payload, settings);
    return token;
  }

  async getRefreshToken(payload: object) {
    const settings = {
      secret: this._SecretRefreshKey,
      expiresIn: this._TokenRefreshExpireTime,
    };

    const token = await this.tokenService.signAsync(payload, settings);
    return token;
  }

  async getTokens(payload: object) {
    const accessToken = await this.getAuthToken(payload);
    const refreshToken = await this.getRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  isTokenValid(token: string) {
    try {
      const settings = {
        secret: this._SecretKey,
      };

      this.tokenService.verify(token, settings);
      return true;
    } catch {
      return false;
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const settings = {
        secret: this._SecretRefreshKey,
      };

      const { userId, login } = this.tokenService.verify(
        refreshToken,
        settings,
      );
      const payload = { userId, login };
      const newTokens = await this.getTokens(payload);
      return newTokens;
    } catch (error) {
      return null;
    }
  }
}
