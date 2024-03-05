import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../types/User';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'anson',
      password: 'anson',
    },
    {
      username: 'danny',
      password: 'ansodannyn',
    },
    {
      username: 'dreak',
      password: 'dreak',
    },
  ];

  getUsers() {
    return this.users.map((user) => plainToInstance(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((item) => item.username === username);
  }
}
