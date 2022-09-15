import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { isInstance } from 'class-validator';

export async function handleException(callback) {
  try {
    await callback();
  } catch (error) {
    if (isInstance(error, PrismaClientKnownRequestError)) {
      throw new ForbiddenException({ message: `Bad Request` });
    } else {
      throw new ForbiddenException({ message: error });
    }
  }
}
