import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(dto: AuthDto) {
    //generate the password
    const hash = await argon.hash(dto.password);

    try {
      //Save the new user in DB
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      return this.signToken(user.id, dto.email);
    } catch (error) {
      //If user is already registerd
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException(' Credentials already taken');
        }
      }
    }
  }

  async login(dto: AuthDto) {
    //Find User
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //If no user found trow exception
    if (!user) throw new ForbiddenException('Provided Email Does not exist');
    // verify password
    const verifypassword = await argon.verify(user.password, dto.password);
    //if not verified
    if (!verifypassword) throw new ForbiddenException(' Password didnot match');

    return this.signToken(user.id, dto.email);
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    try {
      const secret = await this.config.get('JWT_SECRET');
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret,
      });
      return { access_token: token };
    } catch (error) {
      console.log('Error while generating Signtoken');
      return { msg: 'Something went wrong try again!!' };
    }
  }
}
