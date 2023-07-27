import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Track with id ${id} not found!`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class AlbumNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Album with id ${id} not found!`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class ArtistNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Artist with id ${id} not found!`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class TrackNotFavoriteException extends HttpException {
  constructor(id: string) {
    super(`Track with id ${id} is not favorite!`, HttpStatus.NOT_FOUND);
  }
}
export class AlbumNotFavoriteException extends HttpException {
  constructor(id: string) {
    super(`Album with id ${id} is not favorite!`, HttpStatus.NOT_FOUND);
  }
}
export class ArtistNotFavoriteException extends HttpException {
  constructor(id: string) {
    super(`Artist with id ${id} is not favorite!`, HttpStatus.NOT_FOUND);
  }
}
