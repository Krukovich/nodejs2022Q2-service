import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from './users.interface';
import { FIRST_VERSION } from '../../../constants';
import { getHashPassword } from '../../../utils';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  private static users: IUser[] = [];

  constructor(private readonly prismaService: PrismaService) {
    UsersService.users = [];
  }

  async getAllUsers(): Promise<any> {
    return await this.prismaService.users.findMany();
  }

  getUserById(id: IUser['id']): IUser {
    return UsersService.users.find((user) => user.id === id);
  }

  async createUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): Promise<any> {
    return this.prismaService.users.create({
      data: {
        id: uuidv4(),
        login: user.login,
        password: await getHashPassword(user.password),
        version: FIRST_VERSION,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
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
