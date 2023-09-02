import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

export class UserLoginNotExistsException extends HttpException {
  constructor() {
    super('Login already exists.', HttpStatus.CONFLICT);
  }
}

export class AuthenticationFailedException extends HttpException {
  constructor() {
    super('Authentication failed.', HttpStatus.FORBIDDEN);
  }
}
export class AppUnauthorizedException extends UnauthorizedException {
  constructor() {
    super('Authentication failed.');
  }
}
