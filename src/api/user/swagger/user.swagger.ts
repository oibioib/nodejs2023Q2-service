import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export const SwaggerUserEndpoint = () => {
  return applyDecorators(
    ApiTags('User'),
    ApiBearerAuth('accessToken'),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const SwaggerGetAllUsers = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users.',
      description: 'Gets all users.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: User,
    }),
  );
};

export const SwaggerGetUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single user.',
      description: 'Gets single user by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};

export const SwaggerPostUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user.',
      description: 'Creates a new user.',
    }),
    ApiCreatedResponse({
      description: 'The user has been created.',
      type: User,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
  );
};

export const SwaggerPutUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: "Update user's password.",
      description: "Updates user's password by ID (uuid).",
    }),
    ApiOkResponse({
      description: 'The user has been updated.',
      type: User,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiForbiddenResponse({
      description: 'oldPassword is wrong.',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};

export const SwaggerDeleteUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user.',
      description: 'Deletes user by ID (uuid).',
    }),
    ApiNoContentResponse({
      description: 'The user has been deleted.',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'User not found.',
    }),
  );
};
