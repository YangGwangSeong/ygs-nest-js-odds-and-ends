import { BadRequestException, Injectable } from '@nestjs/common';

export class CurrenciesService {
	async getCurrency(currency: string): Promise<any> {}
}

@Injectable()
export class ArticlesService {
	constructor(private readonly currenciesService: CurrenciesService) {}

	async convertAmount({
		from,
		to,
		amount,
	}: {
		from: any;
		to: any;
		amount: any;
	}): Promise<any> {
		if (!from || !to || !amount) {
			throw new BadRequestException();
		}

		const currencyFrom = this.currenciesService.getCurrency(from);
		const currencyTo = this.currenciesService.getCurrency(to);
	}
}
