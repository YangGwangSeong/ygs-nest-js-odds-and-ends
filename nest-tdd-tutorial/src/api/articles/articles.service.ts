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

		try {
			const currencyFrom = await this.currenciesService.getCurrency(from);
			const currencyTo = await this.currenciesService.getCurrency(to);

			return {
				amount: (currencyFrom.value / currencyTo.value) * amount,
			};
		} catch (error) {
			throw new Error(error);
		}
	}
}
