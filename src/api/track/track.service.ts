import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.trackGetAll();
  }

  readOne(id: string) {
    return this.db.trackGetOne(id);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.db.trackCreate(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.trackUpdate(id, updateTrackDto);
  }

  delete(id: string) {
    return this.db.trackDelete(id);
  }
}
