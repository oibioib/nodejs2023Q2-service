import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UUIDParam } from 'src/utils/id';
import {
  AlbumNotFavoriteException,
  AlbumNotFoundException,
  ArtistNotFavoriteException,
  ArtistNotFoundException,
  TrackNotFavoriteException,
  TrackNotFoundException,
} from './favorites.exceptions';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  readAll() {
    return this.favoritesService.readAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
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
      throw new TrackNotFoundException(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
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
      throw new AlbumNotFoundException(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
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
      throw new ArtistNotFoundException(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteTrack(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new TrackNotFavoriteException(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteAlbum(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new AlbumNotFavoriteException(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@UUIDParam('id') id: string) {
    const data = this.favoritesService.deleteFavoriteArtist(id);

    if (data && 'error' in data && data.error === HttpStatus.NOT_FOUND)
      throw new ArtistNotFavoriteException(id);
  }
}
