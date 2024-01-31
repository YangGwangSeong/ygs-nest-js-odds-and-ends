import { BadRequestException, Injectable } from '@nestjs/common';
import { ExchangeType } from './types/exchange.type';
import { CurrenciesService } from '../currencies/currencies.service';
import { ExchangeInputDto } from './dto/exchange-input.dto';

@Injectable()
export class ArticlesService {
	constructor(private readonly currenciesService: CurrenciesService) {}

	async convertAmount({
		from,
		to,
		amount,
	}: ExchangeInputDto): Promise<ExchangeType> {
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
