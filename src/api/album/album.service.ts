import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.albumGetAll();
  }

  readOne(id: string) {
    return this.db.albumGetOne(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.db.albumCreate(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.albumUpdate(id, updateAlbumDto);
  }

  delete(id: string) {
    return this.db.albumDelete(id);
  }
}
