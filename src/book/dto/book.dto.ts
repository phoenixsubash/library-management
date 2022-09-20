import { Category } from '@prisma/client';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  category: Category;

  @IsOptional()
  @IsNumber()
  edition: number;

  @IsDate()
  @IsNotEmpty()
  publishedDate: Date;
}
export class BookEditDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  edition: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  publishedDate: string;

  @IsOptional()
  category: Category;
}
