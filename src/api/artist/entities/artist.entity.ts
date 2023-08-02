import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/api/album/entities/album.entity';
import { Track } from 'src/api/track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
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
    example: 'TestName',
  })
  name: string;

  @Column()
  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @Column({
    type: 'boolean',
    default: false,
    select: false,
  })
  favorite: boolean;
}
