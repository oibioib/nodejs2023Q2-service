import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'OldPassword',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'NewPassword',
  })
  @IsString()
  newPassword: string;
}
