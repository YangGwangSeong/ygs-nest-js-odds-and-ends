import { Controller, Get, Param } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
	constructor(private readonly currenciesService: CurrenciesService) {}

	@Get('/:currency')
	async getCurrency(@Param('currency') currency: string) {
		return await this.currenciesService.getCurrency(currency);
	}
}
