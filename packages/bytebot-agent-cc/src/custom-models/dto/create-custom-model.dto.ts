import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCustomModelDto {
  @IsOptional()
  @IsString()
  @MaxLength(64)
  provider?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  title!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  contextWindow?: number;
}
