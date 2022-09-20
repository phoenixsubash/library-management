import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { IssueModule } from './issue/issue.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BookModule,
    CategoryModule,
    IssueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
