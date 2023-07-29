import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  SwaggerFavoritesEndpoint,
  SwaggerGetAllFavorites,
  SwaggerAddEntityToFavorites,
  SwaggerDeleteEntityFromFavorites,
} from './swagger/favorites.swagger';

import { UUIDParam } from 'src/utils/id';
import { FavoritesService } from './favorites.service';
import { FavoritesException } from './favorites.exceptions';

@Controller('favs')
@SwaggerFavoritesEndpoint()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @SwaggerGetAllFavorites()
  readAll() {
    return this.favoritesService.readAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Track')
  addTrack(@UUIDParam('id') id: string) {
    const data = this.favoritesService.addFavoriteTrack(id);

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Track with id ${id} added to favorites`,
      };
    }

    if (
      data &&
      typeof data !== 'string' &&
      'error' in data &&
      data.error === HttpStatus.UNPROCESSABLE_ENTITY
    )
      throw new FavoritesException(
        'Track',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Album')
  addAlbum(@UUIDParam('id') id: string) {
    const data = this.favoritesService.addFavoriteAlbum(id);

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Album with id ${id} added to favorites`,
      };
    }

    if (
      data &&
      typeof data !== 'string' &&
      'error' in data &&
      data.error === HttpStatus.UNPROCESSABLE_ENTITY
    )
      throw new FavoritesException(
        'Album',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Artist')
  addArtist(@UUIDParam('id') id: string) {
    const data = this.favoritesService.addFavoriteArtist(id);

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Artist with id ${id} added to favorites`,
      };
    }

    if (
      data &&
      typeof data !== 'string' &&
      'error' in data &&
      data.error === HttpStatus.UNPROCESSABLE_ENTITY
    )
      throw new FavoritesException(
        'Artist',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Track')
  deleteTrack(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteTrack(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Track', id, HttpStatus.NOT_FOUND);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Album')
  deleteAlbum(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteAlbum(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Album', id, HttpStatus.NOT_FOUND);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Artist')
  deleteArtist(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteArtist(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Artist', id, HttpStatus.NOT_FOUND);
  }
}
