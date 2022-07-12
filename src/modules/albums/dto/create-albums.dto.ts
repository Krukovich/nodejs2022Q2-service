import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumsDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string;
}
