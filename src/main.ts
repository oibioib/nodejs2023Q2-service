import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const DEFAULT_APP_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorProperties = errors
          .map((error) => error.property)
          .join(', ');

        return new HttpException(
          `Bad request. Body does not contain required fields: [ ${errorProperties} ].`,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || DEFAULT_APP_PORT;

  const config = new DocumentBuilder()
    .setTitle('Node.js Home Library Service')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}

bootstrap();
