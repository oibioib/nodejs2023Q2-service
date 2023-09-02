import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    type: 'string',
    example: 'TestName',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  @IsBoolean()
  readonly grammy: boolean;
}
