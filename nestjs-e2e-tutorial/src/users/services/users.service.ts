import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'anson',
      password: 'anson',
    },
    {
      id: 2,
      username: 'danny',
      password: 'ansodannyn',
    },
    {
      id: 3,
      username: 'dreak',
      password: 'dreak',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((item) => item.username === username);
  }

  getUserById(id: number) {
    return this.users.find((item) => item.id === id);
  }
}
