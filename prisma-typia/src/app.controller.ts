import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleDto } from './article.dto';
import typia from 'typia';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postPosts(@Body() dto: ArticleDto) {
    return true;
  }
}
