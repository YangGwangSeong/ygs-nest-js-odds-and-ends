import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesService } from './api/articles/articles.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ArticlesService],
})
export class AppModule {}
