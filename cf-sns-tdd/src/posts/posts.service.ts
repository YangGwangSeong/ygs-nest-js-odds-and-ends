import { Injectable, NotFoundException } from '@nestjs/common';
import { postItems } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async getPosts() {
    return await this.postsRepository.getPostsRepository();
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.getPostByIdRepository(postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');

    return post;
  }

  async createPost(createPostArgs: CreatePostDto) {
    return await this.postsRepository.createPostRepository(createPostArgs);
  }

  async updatePost(postId: number, { author, title, content }: UpdatePostDto) {
    const post = await this.postsRepository.getPostByIdRepository(postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (author) {
      post.author = author;
    }

    return await this.postsRepository.updatePostRepository(post);
  }

  deletePost(postId: number) {
    const post = postItems.find((item) => item.id === postId);

    if (!post) throw new NotFoundException('post를 찾을 수 없습니다');
  }
}
