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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  //GET Category
  @Get()
  @Roles(Role.STUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.FOUND)
  getCategory() {
    return this.categoryService.getCategory();
  }

  //POST Category
  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  //PATCH Category
  @Patch(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  editCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    dto: CreateCategoryDto,
  ) {
    return this.categoryService.editCategory(categoryId, dto);
  }

  //DELETE Category
  @Delete(':id')
  @Roles(Role.ADMIN)
  deleteCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
