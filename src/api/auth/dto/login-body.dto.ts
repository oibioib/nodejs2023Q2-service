import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginBody {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGE1ZGM5Ni1jMGVhLTQ3MzEtYmZlYi1hZjBiMTY2YjAwMGYiLCJsb2dpbiI6IlRlc3RMb2dpbiIsImlhdCI6MTY5MjY0MTQzOCwiZXhwIjoxNjkyNjQ1MDM4fQ.aVsOXbR3PVAIgjE5BuMZ0O7HDUTg75R88lMwJtVtGyU',
  })
  @IsString()
  readonly accessToken: string;

  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGE1ZGM5Ni1jMGVhLTQ3MzEtYmZlYi1hZjBiMTY2YjAwMGYiLCJsb2dpbiI6IlRlc3RMb2dpbiIsImlhdCI6MTY5MjY0MTQzOCwiZXhwIjoxNjkyNzI3ODM4fQ.PoRR3ICfJa8GeawVr60NiK0WBqvkGD0VtcI6uVcJdiA',
  })
  @IsString()
  readonly refreshToken: string;
}
