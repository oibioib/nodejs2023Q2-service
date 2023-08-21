import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppPort } from './config/app.config';
import { createSwaggerSchema } from './config/swagger.config';
import { AppValidationPipe } from './config/validate.config';
import { LoggingService } from './logging/logging.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const loggingService = new LoggingService(configService);

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection: ${reason}`);
  });

  const app = await NestFactory.create(AppModule, {
    logger: loggingService,
  });
  app.useGlobalPipes(AppValidationPipe);
  const port = getAppPort();
  createSwaggerSchema(app);
  await app.listen(port);
  loggingService.log(`Nest application starts on port: ${port}!`);
}

bootstrap();
