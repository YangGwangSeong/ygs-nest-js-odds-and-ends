import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
	imports: [CurrenciesModule],
	providers: [ArticlesService],
})
export class ArticlesModule {}
