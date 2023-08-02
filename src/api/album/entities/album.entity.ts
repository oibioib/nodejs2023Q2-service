import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/api/artist/entities/artist.entity';
import { Track } from 'src/api/track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
  })
  id: string;

  @Column()
  @ApiProperty({
    type: 'string',
    example: 'Innuendo',
  })
  name: string;

  @Column()
  @ApiProperty({
    type: 'number',
    example: 1991,
  })
  year: number;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
  })
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @Column({
    type: 'boolean',
    default: false,
    select: false,
  })
  favorite: boolean;
}
