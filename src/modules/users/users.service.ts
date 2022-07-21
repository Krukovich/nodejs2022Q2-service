import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IResponseUser, IUser } from './users.interface';
import { EXCEPTION, FIRST_ITEM, FIRST_VERSION } from '../../../constants';
import { getHashPassword } from '../../../utils';
import { PrismaService } from '../../prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers(): Promise<IResponseUser[]> {
    const users: Users[] = await this.prismaService.users.findMany();
    return users.map((user: Users) => {
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
    const user: Users = await this.prismaService.users.findUnique({
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
  }): Promise<Users> {
    try {
      return await this.prismaService.users.create({
        data: {
          id: uuidv4(),
          login: user.login,
          password: await getHashPassword(user.password),
          version: FIRST_VERSION,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (e) {
      throw new HttpException(
        `${e.meta.target[FIRST_ITEM]} ${EXCEPTION.UNPROCESSABLE_ENTITY.UNIQUE}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async changeUser(
    id: IUser['id'],
    data: { oldPassword: IUser['password']; newPassword: IUser['password'] },
  ): Promise<IResponseUser> {
    const hashPassword = await getHashPassword(data.newPassword);
    const updateUser: Users = await this.prismaService.users.update({
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
    await this.prismaService.users.delete({
      where: {
        id: id,
      },
    });
  }
}
