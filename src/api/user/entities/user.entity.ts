import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '68e9f8c8-472a-49d9-a244-4ead304e6038',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'TestUser',
  })
  login: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  version: number;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  createdAt: string;

  @ApiProperty({
    type: 'number',
    example: 1655000000,
  })
  updatedAt: string;
}
