import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { comparePasswords } from '../../../utils/bcypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly usersService: UsersService,
  ) {}
  async validateUser(username: string, password: string) {
    const userDB = await this.usersService.findUserByUsername(username);

    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        return userDB;
      }
    }

    return null;
  }
}
