import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleException } from 'src/utils/exception';
import { IssueDto } from './dto';
@Injectable()
export class IssueService {
  constructor(private prisma: PrismaService) {}

  async createIssue(dto: IssueDto) {
    return await handleException(async () => {
      const isEligible = await this.isEligible(dto.userId);
      const hasStock = await this.hasStock(dto.bookId);

      if (isEligible && hasStock) {
        const issue = await this.prisma.issue.create({
          data: dto,
        });
        if (!issue) {
          throw 'Couldnot create Issue';
        }
        return 'Issue Successfull';
      } else {
      }
    });
  }

  editIssue(issueId: number, dto: IssueDto) {
    return dto;
  }

  async isEligible(userId: number) {
    try {
      const userIssues = await this.prisma.issue.findMany({
        where: {
          userId: userId,
        },
      });
      return userIssues.length <= 5;
    } catch (error) {
      throw error;
    }
  }

  async hasStock(bookId: number) {
    const stock = await this.prisma.stock.findUnique({
      where: {
        bookId: bookId,
      },
    });
    return stock.count > 0;
  }
}

//stock check
//if stock availabe
//issue
// message: out of stock
//
