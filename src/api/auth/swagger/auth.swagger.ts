import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const SwaggerAuthEndpoint = () => {
  return applyDecorators(ApiTags('Auth'));
};
