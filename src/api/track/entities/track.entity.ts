import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'The Show Must Go On',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    type: 'number',
    example: 262,
  })
  duration: number;
}
