import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChangeAlbumsDto {
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
