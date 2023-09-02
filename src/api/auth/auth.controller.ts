import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthenticationFailedException,
  UserLoginNotExistsException,
} from './auth.exceptions';
import {
  SwaggerAuthEndpoint,
  SwaggerAuthLogin,
  SwaggerAuthRefresh,
  SwaggerAuthSignUp,
} from './swagger/auth.swagger';
import { AuthUserDto, RefreshTokenDto } from './dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@SwaggerAuthEndpoint()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAuthSignUp()
  async signup(@Body() authUserDto: AuthUserDto) {
    const { data, errorCode } = await this.authService.signup(authUserDto);

    if (errorCode === HttpStatus.CONFLICT)
      throw new UserLoginNotExistsException();

    return data;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SwaggerAuthLogin()
  async login(@Body() authUserDto: AuthUserDto) {
    const { data, errorCode } = await this.authService.login(authUserDto);

    if (errorCode === HttpStatus.FORBIDDEN)
      throw new AuthenticationFailedException();

    return data;
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @SwaggerAuthRefresh()
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    const { data, errorCode } = await this.authService.refresh(refreshTokenDto);

    if (errorCode === HttpStatus.FORBIDDEN)
      throw new AuthenticationFailedException();

    return data;
  }
}
