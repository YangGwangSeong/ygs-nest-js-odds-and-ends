import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CurrenciesModule } from '../currencies/currencies.module';
import { ArticlesController } from './articles.controller';

@Module({
	imports: [CurrenciesModule],
	providers: [ArticlesService],
	controllers: [ArticlesController],
})
export class ArticlesModule {}
