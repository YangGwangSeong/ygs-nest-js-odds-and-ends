import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface ICreatePostArgs
  extends Omit<
    PostsModel,
    'created_at' | 'updated_at' | 'likeCount' | 'commentCount'
  > {}

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

  async getPostByIdRepository(postId: number) {
    return await this.repository.findOne({ where: { id: postId } });
  }

  async createPostRepository(createPostArgs: ICreatePostArgs) {
    return await this.repository.save(createPostArgs);
  }
}
