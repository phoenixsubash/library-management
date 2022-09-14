import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'src/auth/decorator/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/decorator/strategy';

@Roles(Role.STUDNET)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get()
  getMe(@GetUser() user: User) {
    return user;
  }
}
