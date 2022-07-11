import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

//TODO ADD TYPES
@Injectable()
export class UsersService {
  private readonly users = [];
  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: any) {
    this.users.push({
      id: randomUUID(),
      login: user.login,
      password: user.password,
    });
  }

  changeUser(id: string, { login, password }: any) {
    return this.users.forEach((user) => {
      if (id === user.id) {
        user.login = login;
        user.password = password;
      }
    });
  }
}
