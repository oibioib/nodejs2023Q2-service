import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'varchar',
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
}
