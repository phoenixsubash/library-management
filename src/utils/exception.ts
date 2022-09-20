import { ForbiddenException } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { isInstance } from 'class-validator';

export async function handleException(callback) {
  try {
    return await callback();
  } catch (error) {
    if (isInstance(error, PrismaClientValidationError)) {
      throw new ForbiddenException({ message: 'Bad Request' });
    } else {
      throw new ForbiddenException({ message: error });
    }
  }
}
