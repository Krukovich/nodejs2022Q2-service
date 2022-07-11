import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: IUser['id']): IUser {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUsers: CreateUserDto): IUser {
    return this.usersService.createUser(createUsers);
  }

  @Put(':id')
  changeUser(
    @Param('id') id: IUser['id'],
    @Body(new ValidationPipe()) changeUser: ChangeUserDto,
  ): IUser {
    return this.usersService.changeUser(id, changeUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: IUser['id']) {
    return this.usersService.deleteUser(id);
  }
}
