import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticationFailedException,
  UserLoginNotExistsException,
} from './auth.exceptions';
import { SwaggerAuthEndpoint } from './swagger/auth.swagger';
import { AuthUserDto, RefreshTokenDto } from './dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SwaggerAuthEndpoint()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authUserDto: AuthUserDto) {
    const { data, errorCode } = await this.authService.signup(authUserDto);

    if (errorCode === HttpStatus.CONFLICT)
      throw new UserLoginNotExistsException();

    return data;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authUserDto: AuthUserDto) {
    const { data, errorCode } = await this.authService.login(authUserDto);

    if (errorCode === HttpStatus.FORBIDDEN)
      throw new AuthenticationFailedException();

    return data;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const { data, errorCode } = await this.authService.refresh(refreshTokenDto);

    if (errorCode === HttpStatus.FORBIDDEN)
      throw new AuthenticationFailedException();

    return data;
  }
}
