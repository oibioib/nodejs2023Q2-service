import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Innuendo',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1991,
  })
  year: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
    nullable: true,
  })
  artistId: string | null;
}
