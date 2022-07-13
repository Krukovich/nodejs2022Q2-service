import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from './users.interface';
import { FIRST_VERSION } from '../../../constants';
import { getHashPassword } from '../../../utils';

@Injectable()
export class UsersService {
  private static users: IUser[] = [];

  constructor() {
    UsersService.users = [];
  }

  getAllUsers(): IUser[] {
    return UsersService.users;
  }

  getUserById(id: IUser['id']): IUser {
    return UsersService.users.find((user) => user.id === id);
  }

  async createUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): Promise<IResponseUser> {
    const newUser: IUser = {
      id: uuidv4(),
      login: user.login,
      password: await getHashPassword(user.password),
      createdAt: new Date().valueOf(),
      updatedAt: new Date().valueOf(),
      version: FIRST_VERSION,
    };
    UsersService.users.push(newUser);

    return {
      id: newUser.id,
      login: newUser.login,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      version: newUser.version,
    };
  }

  async changeUser(
    id: IUser['id'],
    data: { oldPassword: IUser['password']; newPassword: IUser['password'] },
  ): Promise<IResponseUser> {
    let findUser: IUser;
    const hashPassword = await getHashPassword(data.newPassword);

    UsersService.users.forEach((user: IUser): void => {
      if (id === user.id) {
        user.password = hashPassword;
        user.updatedAt = new Date().valueOf();
        user.version += FIRST_VERSION;

        findUser = user;
      }
    });

    return {
      id: findUser.id,
      login: findUser.login,
      version: findUser.version,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
    };
  }

  deleteUser(id: IUser['id']): void {
    UsersService.users = UsersService.users.filter(
      (user: IUser) => user.id !== id,
    );
  }
}
