import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';

export interface IPost {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

export const postItems: IPost[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '멤버들 때문에 버거운 민지',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 하니',
    content: '한국어 공부하는 하니',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 3,
    author: 'newjeans_official',
    title: '뉴진스 다니엘',
    content: '당근 먹고 있는 다니엘',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 4,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '이상한 해린',
    likeCount: 10000000,
    commentCount: 999999,
  },
  {
    id: 5,
    author: 'newjeans_official',
    title: '뉴진스 혜인',
    content: '장난 치고 있는 혜인',
    likeCount: 10000000,
    commentCount: 999999,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPost() {
    return postItems;
  }

  @Get(':id')
  getPostbyId(@Param('id') id: number) {
    const post = postItems.find((item) => item.id === id);
    if (!post) throw new NotFoundException();

    return post;
  }

  @Post()
  postPosts(
    @Param('author') author: string,
    @Param('title') title: string,
    @Param('content') content: string,
  ) {
    const newPost: IPost = {
      id: postItems[postItems.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    postItems.push(newPost);

    return newPost;
  }
}
