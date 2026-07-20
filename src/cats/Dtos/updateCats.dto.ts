import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCatsDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsInt()
  age!: number;

  @IsOptional()
  @IsString()
  email!: string;

  @IsOptional()
  @IsString()
  password!: string;
}
