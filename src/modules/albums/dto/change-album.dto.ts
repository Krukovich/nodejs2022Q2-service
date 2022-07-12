import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChangeAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string;
}
