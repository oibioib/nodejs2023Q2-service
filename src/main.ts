import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

const DEFAULT_APP_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorProperties = errors.map((error) => error.property);

        return new HttpException(
          `Request body does not contain required fields: ${errorProperties.join(
            ', ',
          )}.`,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || DEFAULT_APP_PORT;
  await app.listen(port);
}

bootstrap();
