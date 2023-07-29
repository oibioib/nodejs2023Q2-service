import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Favorites } from '../entities/favorites.entity';

export const SwaggerFavoritesEndpoint = () => {
  return applyDecorators(ApiTags('Favorites'));
};

export const SwaggerGetAllFavorites = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all favorites.',
      description: 'Gets all favorites.',
    }),
    ApiOkResponse({
      description: 'Successful operation.',
      type: Favorites,
    }),
  );
};

export const SwaggerAddEntityToFavorites = (entityName: string) => {
  const entityNameWithFirstCapitalLetter = `${entityName
    .charAt(0)
    .toUpperCase()}${entityName.slice(1)}`;
  const entityNameInLowerCase = entityName.toLowerCase();

  return applyDecorators(
    ApiOperation({
      summary: `Add ${entityNameInLowerCase} to favorites.`,
      description: `Adds ${entityNameInLowerCase} to favorites.`,
    }),
    ApiCreatedResponse({
      description: `${entityNameWithFirstCapitalLetter} added to favorites successfully.`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiUnprocessableEntityResponse({
      description: `${entityNameWithFirstCapitalLetter} with id doesn't exist.`,
    }),
  );
};

export const SwaggerDeleteEntityFromFavorites = (entityName: string) => {
  const entityNameWithFirstCapitalLetter = `${entityName
    .charAt(0)
    .toUpperCase()}${entityName.slice(1)}`;
  const entityNameInLowerCase = entityName.toLowerCase();

  return applyDecorators(
    ApiOperation({
      summary: `Delete ${entityNameInLowerCase} from favorites.`,
      description: `Deletes ${entityNameInLowerCase} from favorites by ID (uuid).`,
    }),
    ApiNoContentResponse({
      description: `${entityNameWithFirstCapitalLetter} successfully deleted from favorites.`,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid).',
    }),
    ApiNotFoundResponse({
      description: `${entityNameWithFirstCapitalLetter} was not found.`,
    }),
  );
};
