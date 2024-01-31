import { Module } from '@nestjs/common';
import { CurrenciesModule } from './api/currencies/currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from './api/currencies/currencies.entity';
import { ArticlesModule } from './api/articles/articles.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mongodb',
			url: 'mongodb://1.0.0.3/exchange',
			entities: [Currencies],
			synchronize: true,
			autoLoadEntities: true,
		}),
		CurrenciesModule,
		ArticlesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
