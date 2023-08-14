import { ConfigService } from '@nestjs/config';

export const getAppPort = () => new ConfigService().get('PORT');
