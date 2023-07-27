import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { ArtistModule } from './api/artist/artist.module';
import { TrackModule } from './api/track/track.module';
import { AlbumModule } from './api/album/album.module';
import { FavoritesModule } from './api/favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
