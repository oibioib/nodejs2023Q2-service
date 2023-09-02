import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    type: 'string',
    example: 'OldPassword',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: 'string',
    example: 'NewPassword',
  })
  @IsString()
  newPassword: string;
}
