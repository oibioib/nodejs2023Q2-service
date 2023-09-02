import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from '../api/user/entities/user.entity';
import { Artist } from '../api/artist/entities/artist.entity';
import { Album } from '../api/album/entities/album.entity';
import { Track } from '../api/track/entities/track.entity';

const configService = new ConfigService();

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  synchronize: false,
  entities: [User, Artist, Album, Track],
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
