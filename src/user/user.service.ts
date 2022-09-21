import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto, userUpdateDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';
import { handleException } from 'src/utils/exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //GET User
  async getUser() {
    return await handleException(async () => {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          role: true,
          Issue: {
            select: {
              book: true,
            },
          },
        },
      });
      if (!users) {
        throw 'No any users';
      }
      return users;
    });
  }

  // POST User
  async createUser(dto: UserDto) {
    return await handleException(async () => {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role: dto.role,
        },
      });

      if (!user) {
        throw 'Problem While Creating User';
      }

      return { message: 'Successfully Created' };
    });
  }

  // PATCH User
  async editUser(userId: number, dto: UserDto) {
    return await handleException(async () => {
      let data;
      if (dto.password) {
        const user = await this.findUser(userId);
        if (await argon.verify(user.password, dto.password)) {
          throw 'Please use Dfferent password';
        }
        const hash = await argon.hash(dto.password);
        data = dto;
        data.password = hash;
      } else {
        const newData = new userUpdateDto();
        newData.email = dto.email;
        newData.role = dto.role;
        data = newData;
      }
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });

      if (!user) {
        throw { message: "user doesn't exist" };
      }
      return { message: 'Successfully Updated' };
    });
  }

  // DELETE User
  async deleteUser(userId: number) {
    return await handleException(async () => {
      const user = await this.findUser(userId);
      if (!user) {
        throw 'no any user found of this userid';
      }
      const deleteUser = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      if (!deleteUser) {
        console.log('error while deleting user');
        throw 'Couldnot delete user';
      }
      return { message: `Successfully Deleted userId  ${userId}` };
    });
  }

  // Callable Function
  findUser(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
