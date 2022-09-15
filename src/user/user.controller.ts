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
import { UserCreateDto, UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUser() {
    return this.userService.getUser();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: UserCreateDto) {
    return this.userService.createUser(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  editUser(@Param('id', ParseIntPipe) userId: number, @Body() dto: UserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteUser(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
