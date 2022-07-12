import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChangeTrackDto {
  @IsString()
  @IsOptional()
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
