import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from './users.interface';
import { FIRST_VERSION } from '../../../constants';
import { getHashPassword } from '../../../utils';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<IResponseUser[]> {
    const users: User[] = await this.prismaService.user.findMany();
    return users.map((user: User) => {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: new Date(user.createdAt).valueOf(),
        updatedAt: new Date(user.updatedAt).valueOf(),
      };
    });
  }

  async getUserById(id: IUser['id']): Promise<IUser> {
    const user: User = await this.prismaService.user.findUnique({
      where: { id },
    });

    return {
      id: user.id,
      login: user.login,
      password: user.password,
      version: user.version,
      createdAt: new Date(user.createdAt).valueOf(),
      updatedAt: new Date(user.updatedAt).valueOf(),
    };
  }

  async createUser(user: {
    login: IUser['login'];
    password: IUser['password'];
  }): Promise<User> {
    return await this.prismaService.user.create({
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
    const hashPassword = await getHashPassword(data.newPassword);
    const updateUser: User = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashPassword,
        version: { increment: FIRST_VERSION },
      },
    });

    return {
      id: updateUser.id,
      login: updateUser.login,
      version: updateUser.version,
      createdAt: new Date(updateUser.createdAt).valueOf(),
      updatedAt: new Date(updateUser.updatedAt).valueOf(),
    };
  }

  async deleteUser(id: IUser['id']): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
