import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository extends Repository<UsersModel> {
  constructor(
    @InjectRepository(UsersModel)
    private readonly repository: Repository<UsersModel>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUsersRepository() {
    return await this.repository.find();
  }
}
