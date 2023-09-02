import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
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
    example: 'TestUser',
  })
  login: string;

  @Column()
  @ApiHideProperty()
  @Exclude()
  password: string;

  @Column()
  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime(), {
    toPlainOnly: true,
  })
  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime(), {
    toPlainOnly: true,
  })
  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  updatedAt: Date;
}
