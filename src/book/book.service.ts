import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleException } from 'src/utils/exception';
import { BookCreateDto, BookEditDto } from './dto/book.dto';
type Book = { bookId?: number; bookName?: string };
@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async getBook() {
    return await handleException(async () => {
      const books = await this.prisma.book.findMany({
        take: 5,
        include: {
          category: {
            select: {
              title: true,
              createdAt: true,
            },
          },
        },
      });
      if (books.length == 0) {
        throw 'No any books to show';
      }
      return books;
    });
  }

  async createBook(dto: BookCreateDto) {
    return handleException(async () => {
      const Alreadyexist = await this.searchBook({ bookName: dto.name });
      if (Alreadyexist) {
        throw 'Current Book already Uploded';
      }
      const createdBook = await this.prisma.book.create({ data: dto });
      if (!createdBook) {
        throw 'Error while Creating Book';
      }
      return { message: 'successfully created' };
    });
  }

  async editBook(bookId: number, dto: BookEditDto) {
    return handleException(async () => {
      const Alreadyexist = await this.searchBook({ bookName: dto.name });
      if (Alreadyexist) {
        throw 'Bookname already exist';
      }
      const updatedBook = await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: dto,
      });
      if (!updatedBook) {
        throw ' Bad Request !! Unable to update';
      }
      return 'edited book ';
    });
  }

  async deleteBook(bookId: number) {
    return handleException(async () => {
      const book = await this.searchBook({ bookId });
      if (book) {
        await this.prisma.book.delete({
          where: {
            id: book.id,
          },
        });
        return { message: 'Successfully Deleted' };
      } else {
        return { message: 'Given Book Not found' };
      }
    });
  }

  async searchBook({ bookId, bookName }: Book) {
    if (bookId) {
      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
      return book;
    } else if (bookName) {
      const book = await this.prisma.book.findUnique({
        where: {
          name: bookName,
        },
      });
      return book;
    }
  }
}
