import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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

  async createPostRepository(createPostArgs: CreatePostDto) {
    return await this.repository.save({
      content: createPostArgs.content,
      title: createPostArgs.title,
      author: createPostArgs.author,
    });
  }

  async updatePostRepository(updatePostArgs: UpdatePostDto) {
    return await this.repository.save({
      title: updatePostArgs.title,
      content: updatePostArgs.content,
      author: updatePostArgs.author,
    });
  }

  async deletePostRepository(postId: number) {
    await this.repository.delete({ id: postId });
  }
}
