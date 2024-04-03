import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:postId')
  async getPost(@Param('postId') postId: string) {
    return await this.postsService.getPostById(+postId);
  }

  @Get()
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Post()
  async postPosts(@Body() dto: CreatePostDto) {
    return await this.postsService.createPost(dto);
  }

  @Patch('/:postId')
  async patchPost(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    return await this.postsService.updatePost(+postId, dto);
  }

  @Delete('/:postId')
  async deletePost(@Param('postId') postId: string) {
    return await this.postsService.deletePost(+postId);
  }
}
