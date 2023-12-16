import { Module } from '@nestjs/common';
import { ArticlesService } from './api/articles/articles.service';
import { CurrenciesModule } from './api/currencies/currencies.module';

@Module({
	imports: [CurrenciesModule],
	controllers: [],
	providers: [ArticlesService],
})
export class AppModule {}
