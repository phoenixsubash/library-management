import { Injectable } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleException } from 'src/utils/exception';
import { StockDto } from './dto';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private bookservice: BookService,
  ) {}

  async getStock() {
    return await handleException(async () => {
      const stocks = await this.prisma.stock.findMany({
        select: {
          id: true,
          book: {
            select: {
              id: true,
              name: true,
            },
          },
          sku: true,
          count: true,
        },
      });

      if (!stocks || stocks.length <= 0) {
        throw 'Couldnot find any stocks';
      }
      return stocks;
    });
  }
  async updateStock(stockId: number, dto: StockDto) {
    return await handleException(async () => {
      const updated = await this.prisma.stock.update({
        where: {
          id: stockId,
        },
        data: dto,
      });
      if (!updated) {
        throw 'Error while updating Stocks';
      }
      return { message: 'successfully Updated stock' };
    });
  }

  async createStock(dto: StockDto) {
    return await handleException(async () => {
      const created = await this.prisma.stock.create({
        data: dto,
      });
      if (!created) {
        console.log('unable to Create Stock');
        throw ' Unable to update ';
      }
      return { message: 'successfully created' };
    });
  }

  async searchSku(sku: string) {
    const data = await this.prisma.stock.findUnique({
      where: {
        sku: sku,
      },
    });

    return data;
  }
}
