import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsRepository extends Repository<PostsModel> {
  constructor(
    @InjectRepository(PostsModel)
    private readonly repository: Repository<PostsModel>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getPostsRepository() {
    return await this.repository.find();
  }
}
