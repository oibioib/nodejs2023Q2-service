import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Artist } from '../entities/artist.entity';

export const SwaggerArtistEndpoint = () => {
  return applyDecorators(ApiTags('Artist'));
};

export const SwaggerGetAllArtists = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all artists.',
      description: 'Gets all artists.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Artist,
    }),
  );
};

export const SwaggerGetArtist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single artist.',
      description: 'Gets single artist by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Artist,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Artist not found.',
    }),
  );
};

export const SwaggerPostArtist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new artist.',
      description: 'Creates a new artist.',
    }),
    ApiCreatedResponse({
      description: 'The artist has been created.',
      type: Artist,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
  );
};

export const SwaggerPutArtist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update artist information.',
      description: 'Updates artist information by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The artist has been updated.',
      type: Artist,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Artist not found.',
    }),
  );
};

export const SwaggerDeleteArtist = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete artist.',
      description: 'Deletes artist by ID (uuid).',
    }),
    ApiNoContentResponse({
      description: 'The artist has been deleted.',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Artist not found.',
    }),
  );
};
