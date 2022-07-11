import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];
  constructor() {
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById() {
    return this.users;
  }
}
