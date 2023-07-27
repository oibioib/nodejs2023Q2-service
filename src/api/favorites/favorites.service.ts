import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.favoritesGetAll();
  }
}
