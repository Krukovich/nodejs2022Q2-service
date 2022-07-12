import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string;

  @IsUUID()
  @IsOptional()
  albumId: string;

  @IsNumber()
  @IsOptional()
  duration: number;
}
