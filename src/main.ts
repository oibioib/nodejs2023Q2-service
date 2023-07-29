import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppPort } from './config/app.config';
import { createSwaggerSchema } from './config/swagger.config';
import { AppValidationPipe } from './config/validate.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(AppValidationPipe);
  const port = getAppPort(app);
  createSwaggerSchema(app);
  await app.listen(port);
}

bootstrap();
