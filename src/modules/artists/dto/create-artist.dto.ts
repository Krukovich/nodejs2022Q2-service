import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
