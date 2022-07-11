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

  //TODO
  // Server should answer with status code 200 and all users records
  @Get()
  getAllUsers(): IUser[] {
    return this.usersService.getAllUsers();
  }

  //TODO
  // Server should answer with status code 200 and and record with id === userId if it exists
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  @Get(':id')
  getUserById(@Param('id') id: IUser['id']): IUser {
    return this.usersService.getUserById(id);
  }

  //TODO
  // Server should answer with status code 201 and newly created record if request is valid
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields
  @Post()
  createUser(@Body(new ValidationPipe()) createUsers: CreateUserDto): IUser {
    return this.usersService.createUser(createUsers);
  }

  //TODO
  // Change only user password
  // Server should answer with status code 200 and updated record if request is valid
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  // Server should answer with status code 403 and corresponding message if oldPassowrd is wrong
  @Put(':id')
  changeUser(
    @Param('id') id: IUser['id'],
    @Body(new ValidationPipe()) changeUser: ChangeUserDto,
  ): IUser {
    return this.usersService.changeUser(id, changeUser);
  }

  //TODO
  // Server should answer with status code 204 if the record is found and deleted
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
  @Delete(':id')
  deleteUser(@Param('id') id: IUser['id']) {
    return this.usersService.deleteUser(id);
  }
}
