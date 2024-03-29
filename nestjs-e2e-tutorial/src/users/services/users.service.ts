import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../types/User';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { encodePassword } from '../../utils/bcypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

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

  createUser(createUserDto: CreateUserDto) {
    const hashPassword = encodePassword(createUserDto.password);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    return this.usersRepository.save(newUser);
  }

  findUserByUsername(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  fundUserById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }
}
