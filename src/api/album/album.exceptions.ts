import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumNotFoundException extends HttpException {
  constructor() {
    super('Album not found', HttpStatus.NOT_FOUND);
  }
}
