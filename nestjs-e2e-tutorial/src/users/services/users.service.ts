import { Injectable } from '@nestjs/common';
import { User } from '../types/User';

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
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find((item) => item.username === username);
  }
}
