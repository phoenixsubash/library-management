import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Role } from 'src/auth/decorator/enum/role.enum';
export class userUpdateDto {
  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;
}
export class UserDto extends userUpdateDto {
  @IsOptional()
  @IsString()
  password: string;
}

export class UserCreateDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
