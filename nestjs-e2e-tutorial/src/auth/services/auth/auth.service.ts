import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly usersService: UsersService,
  ) {}
  validateUser(username: string, password: string) {}
}
