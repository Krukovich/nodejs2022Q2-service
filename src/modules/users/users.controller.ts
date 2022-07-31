import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { IResponseUser, IUser } from './users.interface';
import { EXCEPTION } from '../../../constants';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { comparePassword, uuidValidateV4 } from '../../../utils';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(): Promise<IResponseUser[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: IUser['id']): Promise<IResponseUser> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<IResponseUser> {
    const user: User = await this.usersService.createUser(createUsers);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async changeUser(
    @Param('id') id: IUser['id'],
    @Body(new ValidationPipe()) changeUser: ChangeUserDto,
  ): Promise<IResponseUser> {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await comparePassword(changeUser.oldPassword, user.password))) {
      throw new HttpException(
        EXCEPTION.FORBIDDEN.BAD_PASSWORD,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.usersService.changeUser(id, changeUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: IUser['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: IUser = await this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.usersService.deleteUser(id);
    }
  }
}
