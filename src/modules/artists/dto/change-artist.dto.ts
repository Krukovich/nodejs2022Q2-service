import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class ChangeArtistDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
