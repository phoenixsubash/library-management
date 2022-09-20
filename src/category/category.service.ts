import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleException } from 'src/utils/exception';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getCategory() {
    return await handleException(async () => {
      const data = await this.prisma.category.findMany();
      if (data.length <= 0) {
        throw 'no data to display';
      }
      return data;
    });
  }

  async createCategory(dto: CreateCategoryDto) {
    return await handleException(async () => {
      const exist = await this.prisma.category.findUnique({
        where: {
          title: dto.title,
        },
      });
      if (exist) {
        throw ' Repeted Category!!! try Unique';
      }
      const data = await this.prisma.category.create({
        data: dto,
      });
      if (!data) {
        throw 'Exception while creating Category';
      }
      return { message: 'Successfully created' };
    });
  }

  async editCategory(categoryId: number, dto: UpdateCategoryDto) {
    return await handleException(async () => {
      const category = await this.findCategory(categoryId);
      console.log('category', category);
      if (category.title == dto.title) {
        throw ' Repeted Category!!! try Unique';
      }
      const updatedCategory = this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: dto,
      });
      if (!updatedCategory) {
        throw 'Fail to update category';
      }
    });
  }

  async deleteCategory(categoryId) {
    return await handleException(async () => {
      const category = await this.findCategory(categoryId);
      const deleted = await this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
      if (!deleted) {
        throw 'Couldnot delete this category';
      }
      return { message: `Successfully deleted Category${category.title}` };
    });
  }

  async findCategory(categoryId) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw 'couldnot find category';
    }
    return category;
  }
}
