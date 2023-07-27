import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.favoritesGetAll();
  }

  addFavoriteTrack(id: string) {
    return this.db.favoritesAddTrack(id);
  }

  addFavoriteAlbum(id: string) {
    return this.db.favoritesAddAlbum(id);
  }

  addFavoriteArtist(id: string) {
    return this.db.favoritesAddArtist(id);
  }

  deleteFavoriteTrack(id: string) {
    return this.db.favoritesDeleteTrack(id);
  }

  deleteFavoriteAlbum(id: string) {
    return this.db.favoritesDeleteAlbum(id);
  }

  deleteFavoriteArtist(id: string) {
    return this.db.favoritesDeleteArtist(id);
  }
}
