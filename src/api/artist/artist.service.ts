import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.artistGetAll();
  }

  readOne(id: string) {
    return this.db.artistGetOne(id);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.db.artistCreate(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.artistUpdate(id, updateArtistDto);
  }

  delete(id: string) {
    return this.db.artistDelete(id);
  }
}
