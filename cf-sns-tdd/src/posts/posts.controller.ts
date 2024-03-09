import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

export interface IPost {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost() {}
}
