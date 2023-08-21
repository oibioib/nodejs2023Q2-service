import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/api/user/entities/user.entity';
import { LoginBody } from '../dto/login-body.dto';

export const SwaggerAuthEndpoint = () => {
  return applyDecorators(ApiTags('Auth'));
};

export const SwaggerAuthSignUp = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'SignUp a new user.',
      description: 'SignUp a new user.',
    }),
    ApiCreatedResponse({
      description: 'The user has been registered.',
      type: User,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
    ApiConflictResponse({
      description: 'Login already exists.',
    }),
  );
};

export const SwaggerAuthLogin = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate user.',
      description: 'Authenticate user',
    }),
    ApiOkResponse({
      description: 'User is authenticated.',
      type: LoginBody,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
    ApiForbiddenResponse({
      description: 'Authentication failed.',
    }),
  );
};

export const SwaggerAuthRefresh = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh user tokens.',
      description: 'Refresh user tokens.',
    }),
    ApiOkResponse({
      description: 'User tokens refreshed.',
      type: LoginBody,
    }),
    ApiUnauthorizedResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
    ApiForbiddenResponse({
      description: 'Authentication failed.',
    }),
  );
};
