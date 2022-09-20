import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleException } from 'src/utils/exception';
import { BookCreateDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async getBook() {
    return await handleException(async () => {
      const books = await this.prisma.book.findMany();
      if (books.length == 0) {
        throw 'No books to show';
      }
      return books;
    });
  }

  async createBook(dto: BookCreateDto) {
    return handleException(async () => {
      const book = this.prisma.book.create({ data: dto });
      return book;
    });
  }

  editBook(bookId, dto) {
    return 'edited book';
  }

  deleteBook(bookId) {
    return 'Deleted book';
  }
}
