import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IResponseUser, IUser } from '../users/users.interface';
import { User } from '@prisma/client';
import { EXCEPTION } from '../../../constants';
import { comparePassword } from '../../../utils';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ITokens } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async authUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<IResponseUser> {
    const user: User = await this.authService.authUser(createUsers);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<ITokens> {
    const user: IUser = await this.usersService.getUserByLogin(
      createUsers.login,
    );

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await comparePassword(createUsers.password, user.password))) {
      throw new HttpException(
        EXCEPTION.FORBIDDEN.BAD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.authService.generateTokens({
      id: user.id,
      login: user.login,
    });
  }
}
