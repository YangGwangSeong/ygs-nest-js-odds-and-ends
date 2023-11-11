import { Module } from '@nestjs/common';
import { ArticlesService } from './api/articles/articles.service';

@Module({
	imports: [],
	controllers: [],
	providers: [ArticlesService],
})
export class AppModule {}
