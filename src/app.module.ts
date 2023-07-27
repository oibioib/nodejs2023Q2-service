import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { ArtistModule } from './api/artist/artist.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
