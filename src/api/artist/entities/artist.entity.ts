import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'TestName',
  })
  name: string;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  grammy: boolean;
}
