import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsInt()
  parent_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsInt()
  parent_id: number;

  @IsOptional()
  @IsString()
  title: string;
}
