import { ConfigService } from '@nestjs/config';

export const DEFAULT_APP_PORT = 4000;

export const getAppPort = () =>
  new ConfigService().get('PORT') || DEFAULT_APP_PORT;
