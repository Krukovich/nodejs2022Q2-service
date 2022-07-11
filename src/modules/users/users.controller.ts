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
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: IUser['id']) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUsers: CreateUserDto) {
    return this.usersService.createUser(createUsers);
  }

  @Put(':id')
  changeUser(
    @Param('id') id: IUser['id'],
    @Body(new ValidationPipe()) changeUser: ChangeUserDto,
  ) {
    return this.usersService.changeUser(id, changeUser);
  }

  @Delete()
  deleteUser(@Param(':id') id: IUser['id']) {
    return this.usersService.deleteUser(id);
  }
}
