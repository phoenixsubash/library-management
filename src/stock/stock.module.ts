import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookModule } from 'src/book/book.module';

@Module({
  providers: [StockService],
  controllers: [StockController],
  imports: [PrismaModule, BookModule],
})
export class StockModule {}
