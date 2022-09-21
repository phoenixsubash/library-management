import { Type } from 'class-transformer';
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
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  edition: number;

  @Type(() => Date)
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
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  publishedDate: Date;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
