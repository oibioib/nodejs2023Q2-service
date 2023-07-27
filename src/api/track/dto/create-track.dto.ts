import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly name: string;

  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly artistId: string | null;

  @ValidateIf((_object, value) => value !== null)
  @IsString()
  readonly albumId: string | null;

  @IsNumber()
  readonly duration: number;
}
