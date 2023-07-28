import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'TestLogin',
  })
  @IsString()
  readonly login: string;

  @ApiProperty({
    example: 'TestPassword',
  })
  @IsString()
  readonly password: string;
}
