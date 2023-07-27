import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [DbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
