import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly artistId: string | null;
}
