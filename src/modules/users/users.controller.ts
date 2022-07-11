import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  createUser(@Body() createUsers: CreateUserDto) {
    return this.usersService.createUser(createUsers);
  }

  @Put(':id')
  changeUser(@Param('id') id: string, @Body() changeUser: ChangeUserDto) {
    return this.usersService.changeUser(id, changeUser);
  }
}
