import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/decorator/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/decorator/strategy';
import { RolesGuard } from 'src/auth/decorator/strategy/roles.guard';
import { BookService } from './book.service';
import { BookCreateDto, BookEditDto } from './dto/book.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  //GET BOOK
  @Get()
  @HttpCode(HttpStatus.OK)
  getBook() {
    return this.bookService.getBook();
  }

  // POST BOOK
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createBook(@Body() dto: BookCreateDto) {
    return this.bookService.createBook(dto);
  }

  //PATCH BOOK
  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  editBook(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: BookEditDto,
  ) {
    return this.bookService.editBook(bookId, dto);
  }

  //DELETE BOOK
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteBook(@Param('id', ParseIntPipe) bookId: number) {
    return this.bookService.deleteBook(bookId);
  }
}
