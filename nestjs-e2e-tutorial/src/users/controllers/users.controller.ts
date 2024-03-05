import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:username')
  getByUsername(@Param('usernmae') username: string) {
    const user = this.usersService.getUserByUsername(username);

    if (user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
}
