import { IsNotEmpty, IsNumber } from 'class-validator';

export class IssueDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
