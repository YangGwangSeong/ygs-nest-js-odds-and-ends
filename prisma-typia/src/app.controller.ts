import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { IBbsArticle } from './article.dto';
import core from '@nestia/core';
import { tags } from 'typia';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @core.TypedRoute.Get(':id')
  getHello(@core.TypedParam('id') id: string & tags.Format<'uuid'>): string {
    return this.appService.getHello(id);
  }

  @core.TypedRoute.Post()
  async postPosts(
    @core.TypedBody() input: IBbsArticle.IStore,
  ): Promise<IBbsArticle> {
    return {
      ...input,
      id: '2b5e21d8-0e44-4482-bd3e-4540dee7f3d6',
      created_at: '2023-04-23T12:04:54.168Z',
    };
  }
}
