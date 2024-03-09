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
  getPost() {
    return {
      author: 'newjeans_official',
      title: '뉴진스 민지',
      content: '메이크업 고치고 있는 민지',
      likeCount: 10000000,
      commentCount: 999999,
    };
  }
}
