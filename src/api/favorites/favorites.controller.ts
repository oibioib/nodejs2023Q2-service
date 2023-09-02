import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  SwaggerFavoritesEndpoint,
  SwaggerGetAllFavorites,
  SwaggerAddEntityToFavorites,
  SwaggerDeleteEntityFromFavorites,
} from './swagger/favorites.swagger';

import { UUIDParam } from 'src/libs/id';
import { FavoritesService } from './favorites.service';
import { FavoritesException } from './favorites.exceptions';
import { AuthGuard } from '../auth/auth.guard';

@Controller('favs')
@UseGuards(AuthGuard)
@SwaggerFavoritesEndpoint()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @SwaggerGetAllFavorites()
  async readAll() {
    const { data } = await this.favoritesService.readAll();
    return data;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Track')
  async addTrack(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.favoritesService.addFavoriteTrack(
      id,
    );

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Track with id ${id} added to favorites`,
      };
    }

    if (errorCode === HttpStatus.UNPROCESSABLE_ENTITY)
      throw new FavoritesException(
        'Track',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Album')
  async addAlbum(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.favoritesService.addFavoriteAlbum(
      id,
    );

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Album with id ${id} added to favorites`,
      };
    }

    if (errorCode === HttpStatus.UNPROCESSABLE_ENTITY)
      throw new FavoritesException(
        'Album',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @SwaggerAddEntityToFavorites('Artist')
  async addArtist(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.favoritesService.addFavoriteArtist(
      id,
    );

    if (data === id) {
      return {
        statusCode: HttpStatus.CREATED,
        message: `Artist with id ${id} added to favorites`,
      };
    }

    if (errorCode === HttpStatus.UNPROCESSABLE_ENTITY)
      throw new FavoritesException(
        'Artist',
        id,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Track')
  async deleteTrack(@UUIDParam('id') id: string) {
    const { errorCode } = await this.favoritesService.deleteFavoriteTrack(id);

    if (errorCode === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Track', id, HttpStatus.NOT_FOUND);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Album')
  async deleteAlbum(@UUIDParam('id') id: string) {
    const { errorCode } = await this.favoritesService.deleteFavoriteAlbum(id);

    if (errorCode === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Album', id, HttpStatus.NOT_FOUND);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteEntityFromFavorites('Artist')
  async deleteArtist(@UUIDParam('id') id: string) {
    const { errorCode } = await this.favoritesService.deleteFavoriteArtist(id);

    if (errorCode === HttpStatus.NOT_FOUND)
      throw new FavoritesException('Artist', id, HttpStatus.NOT_FOUND);
  }
}
