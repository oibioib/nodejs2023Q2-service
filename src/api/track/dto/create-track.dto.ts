import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    type: 'string',
    example: 'The Show Must Go On',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly artistId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly albumId: string | null;

  @ApiProperty({
    type: 'number',
    example: 262,
  })
  @IsNumber()
  readonly duration: number;
}
