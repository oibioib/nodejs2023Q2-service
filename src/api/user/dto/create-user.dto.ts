import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'TestLogin',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    type: 'string',
    example: 'TestPassword',
  })
  @IsString()
  readonly password: string;
}
