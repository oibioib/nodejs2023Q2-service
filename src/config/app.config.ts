import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DEFAULT_APP_PORT = 4000;

export const getAppPort = (app: INestApplication) => {
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT') || DEFAULT_APP_PORT;
  return port;
};
