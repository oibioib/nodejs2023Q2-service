import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

export const AppValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    const errorProperties = errors.map((error) => error.property).join(', ');

    return new HttpException(
      `Bad request. Body does not contain required fields: [ ${errorProperties} ].`,
      HttpStatus.BAD_REQUEST,
    );
  },
});
