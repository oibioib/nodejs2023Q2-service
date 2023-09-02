import { HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { ServiceResponse } from 'src/libs/service-response';
import { TokenService } from 'src/token/token.service';
import { AuthUserDto, RefreshTokenDto } from './dto';

type TokensType = 'accessToken' | 'refreshToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(authUserDto: AuthUserDto) {
    const serviceResponse = new ServiceResponse();

    const isLoginExists = await this.userService.isUserLoginExists(
      authUserDto.login,
    );

    if (!isLoginExists) {
      const user = await this.userService.create(authUserDto);
      serviceResponse.data = user.data;
    }

    if (isLoginExists) {
      serviceResponse.errorCode = HttpStatus.CONFLICT;
    }

    return serviceResponse;
  }

  async login(authUserDto: AuthUserDto) {
    const serviceResponse = new ServiceResponse<Record<TokensType, string>>();

    const validUser = await this.userService.getValidUser(authUserDto);

    if (!validUser) {
      serviceResponse.errorCode = HttpStatus.FORBIDDEN;
      return serviceResponse;
    }

    const payload = { userId: validUser.id, login: validUser.login };
    const tokens = await this.tokenService.getTokens(payload);

    serviceResponse.data = tokens;

    return serviceResponse;
  }

  async refresh({ refreshToken }: RefreshTokenDto) {
    const serviceResponse = new ServiceResponse();

    const tokens = await this.tokenService.verifyRefreshToken(refreshToken);

    if (!tokens) {
      serviceResponse.errorCode = HttpStatus.FORBIDDEN;
      return serviceResponse;
    }

    serviceResponse.data = tokens;
    return serviceResponse;
  }
}
