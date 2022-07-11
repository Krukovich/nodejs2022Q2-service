import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IUser } from './users.interface';
import { FIRST_VERSION } from '../../../constants';

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  constructor() {
    this.users = [];
  }

  getAllUsers(): IUser[] {
    return this.users;
  }

  getUserById(id: IUser['id']): IUser {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): IUser {
    const newUser: IUser = {
      id: randomUUID(),
      login: user.login,
      password: user.password,
      createdAt: new Date().getMilliseconds(),
      updatedAt: new Date().getMilliseconds(),
      version: FIRST_VERSION,
    };
    this.users.push(newUser);

    return newUser;
  }

  changeUser(
    id: IUser['id'],
    data: { login: IUser['login']; password: IUser['password'] },
  ): IUser {
    let findUser: IUser;

    this.users.forEach((user: IUser): void => {
      if (id === user.id) {
        user.login = data.login;
        user.password = data.password;
        user.updatedAt = new Date().getMilliseconds();
        user.version += FIRST_VERSION;

        findUser = user;
      }
    });

    return findUser;
  }

  deleteUser(id: IUser['id']): IUser[] {
    return (this.users = this.users.filter((user: IUser) => user.id !== id));
  }
}
