import { HttpException, HttpStatus } from '@nestjs/common';

export class FavoritesException extends HttpException {
  constructor(instance: string, id: string, status: HttpStatus) {
    super(`${instance} with id ${id} is not in favorites!`, status);
  }
}
