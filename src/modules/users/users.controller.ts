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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { IResponseUser, IUser } from './users.interface';
import { comparePassword, uuidValidateV4 } from '../../../utils';
import { EXCEPTION } from '../../../constants';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: IUser['id']): IUser {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user: IUser = this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ValidationPipe()) createUsers: CreateUserDto,
  ): Promise<IResponseUser> {
    return await this.usersService.createUser(createUsers);
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

    const user: IUser = this.usersService.getUserById(id);

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
  deleteUser(@Param('id') id: IUser['id']) {
    if (!uuidValidateV4(id)) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.BAD_UUID,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: IUser = this.usersService.getUserById(id);

    if (!user) {
      throw new HttpException(
        EXCEPTION.BAD_REQUEST.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    } else {
      this.usersService.deleteUser(id);
    }
  }
}
