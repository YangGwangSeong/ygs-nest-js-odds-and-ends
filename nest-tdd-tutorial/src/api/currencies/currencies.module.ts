import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesRepository } from './currencies.repository';

@Module({
	providers: [CurrenciesService],
})
export class CurrenciesModule {}
