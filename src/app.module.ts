import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './api/user/user.module';
import { ArtistModule } from './api/artist/artist.module';
import { TrackModule } from './api/track/track.module';
import { AlbumModule } from './api/album/album.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { AuthModule } from './api/auth/auth.module';

import { dataSourceConfig } from './config/data-source.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
