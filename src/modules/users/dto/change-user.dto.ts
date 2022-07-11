import { IsOptional } from 'class-validator';

export class ChangeUserDto {
  @IsOptional()
  login: string;

  @IsOptional()
  password: string;
}
