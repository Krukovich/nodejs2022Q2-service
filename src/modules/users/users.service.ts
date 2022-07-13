import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from './users.interface';
import { FIRST_VERSION } from '../../../constants';
import { getHashPassword } from '../../../utils';

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
  //TODO CHANGE DATE TO valueOf()
  async createUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): Promise<IResponseUser> {
    const newUser: IUser = {
      id: uuidv4(),
      login: user.login,
      password: await getHashPassword(user.password),
      createdAt: new Date().getMilliseconds(),
      updatedAt: new Date().getMilliseconds(),
      version: FIRST_VERSION,
    };
    this.users.push(newUser);

    return {
      id: newUser.id,
      login: newUser.login,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      version: newUser.version,
    };
  }
  //TODO CHANGE DATE TO valueOf()
  async changeUser(
    id: IUser['id'],
    data: { oldPassword: IUser['password']; newPassword: IUser['password'] },
  ): Promise<IResponseUser> {
    let findUser: IUser;
    const hashPassword = await getHashPassword(data.newPassword);

    this.users.forEach((user: IUser): void => {
      if (id === user.id) {
        user.password = hashPassword;
        user.updatedAt = new Date().getMilliseconds();
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
    this.users = this.users.filter((user: IUser) => user.id !== id);
  }
}
