import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [DbModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
