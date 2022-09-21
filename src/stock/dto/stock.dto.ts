import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class StockDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;
}
