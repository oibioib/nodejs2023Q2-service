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
import { Track } from '../entities/track.entity';

export const SwaggerTrackEndpoint = () => {
  return applyDecorators(ApiTags('Track'));
};

export const SwaggerGetAllTracks = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all tracks.',
      description: 'Get all tracks.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Track,
    }),
  );
};

export const SwaggerGetTrack = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single track.',
      description: 'Get single track by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Track not found.',
    }),
  );
};

export const SwaggerPostTrack = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new track.',
      description: 'Creates a new track.',
    }),
    ApiCreatedResponse({
      description: 'The track has been created.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Body does not contain required fields: [ ...fields ].',
    }),
  );
};

export const SwaggerPutTrack = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update track information.',
      description: 'Updates track information by ID (uuid).',
    }),
    ApiOkResponse({
      description: 'The track has been updated.',
      type: Track,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Track not found.',
    }),
  );
};

export const SwaggerDeleteTrack = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete track.',
      description: 'Deletes track by ID (uuid).',
    }),
    ApiNoContentResponse({
      description: 'The track has been deleted.',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: 'Track not found.',
    }),
  );
};
