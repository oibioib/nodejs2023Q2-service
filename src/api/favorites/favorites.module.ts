import { Module } from '@nestjs/common';

import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [ArtistModule, TrackModule, AlbumModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
