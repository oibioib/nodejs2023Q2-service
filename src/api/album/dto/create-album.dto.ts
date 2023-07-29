import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    type: 'string',
    example: 'Innuendo',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'number',
    example: 1991,
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly artistId: string | null;
}
