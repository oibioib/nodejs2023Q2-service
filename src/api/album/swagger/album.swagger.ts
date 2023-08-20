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
import { Album } from '../entities/album.entity';

export const SwaggerAlbumEndpoint = () => {
  return applyDecorators(ApiTags('Album'));
};

export const SwaggerGetAllAlbums = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all albums.',
      description: 'Gets all albums.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Album,
    }),
  );
};

export const SwaggerGetAlbum = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single album.',
      description: 'Gets single album by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Album,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Album not found.',
    }),
  );
};

export const SwaggerPostAlbum = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new album.',
      description: 'Creates a new album.',
    }),
    ApiCreatedResponse({
      description: 'The album has been created.',
      type: Album,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Error in request body. Error fields: [ ...fields ].',
    }),
  );
};

export const SwaggerPutAlbum = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update album information.',
      description: 'Updates album information by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The album has been updated.',
      type: Album,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Album not found.',
    }),
  );
};

export const SwaggerDeleteAlbum = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete album.',
      description: 'Deletes album by ID (uuid).',
    }),
    ApiNoContentResponse({
      description: 'The album has been deleted.',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Album not found.',
    }),
  );
};
