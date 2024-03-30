import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';

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
      authorId: createPostArgs.authorId,
    });
  }

  async updatePostRepository(updatePostArgs: PostsModel) {
    return await this.repository.save({
      id: updatePostArgs.id,
      authorId: updatePostArgs.authorId,
      title: updatePostArgs.title,
      content: updatePostArgs.content,
      likeCount: updatePostArgs.likeCount,
      commentCount: updatePostArgs.commentCount,
      created_at: updatePostArgs.created_at,
    });
  }

  async deletePostRepository(postId: number) {
    await this.repository.delete({ id: postId });
  }
}
