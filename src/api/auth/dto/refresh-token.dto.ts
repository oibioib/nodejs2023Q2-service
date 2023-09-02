import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGE1ZGM5Ni1jMGVhLTQ3MzEtYmZlYi1hZjBiMTY2YjAwMGYiLCJsb2dpbiI6IlRlc3RMb2dpbiIsImlhdCI6MTY5MjY0MTQzOCwiZXhwIjoxNjkyNjQ1MDM4fQ.aVsOXbR3PVAIgjE5BuMZ0O7HDUTg75R88lMwJtVtGyU',
  })
  @IsString()
  readonly refreshToken: string;
}
