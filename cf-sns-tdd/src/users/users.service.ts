import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers() {
    return await this.usersRepository.getUsersRepository();
  }

  async createUser(createUserDtoArgs: CreateUserDto) {
    return await this.usersRepository.createUserRepository(createUserDtoArgs);
  }
}
