import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE')
    private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.usersService.fundUserById(user.id);

    return userDB ? done(null, userDB) : done(null, null);
  }
}
