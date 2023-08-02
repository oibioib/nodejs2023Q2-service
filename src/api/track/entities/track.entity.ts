import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/api/album/entities/album.entity';
import { Artist } from 'src/api/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track {
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
    example: 'The Show Must Go On',
  })
  name: string;

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
  albumId: string | null;

  @Column()
  @ApiProperty({
    type: 'number',
    example: 262,
  })
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album;
}
