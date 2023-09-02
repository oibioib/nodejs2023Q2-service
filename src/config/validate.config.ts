import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { RefreshTokenDto } from 'src/api/auth/dto';

export const AppValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    const errorProperties = errors.map((error) => error.property).join(', ');
    let status = HttpStatus.BAD_REQUEST;

    if (errors.some((error) => error.target instanceof RefreshTokenDto))
      status = HttpStatus.UNAUTHORIZED;

    return new HttpException(
      `Bad request. Error in request body. Error fields: [ ${errorProperties} ].`,
      status,
    );
  },
});
