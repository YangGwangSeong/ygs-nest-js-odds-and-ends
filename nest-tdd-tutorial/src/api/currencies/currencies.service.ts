import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';

export class Currencies {
	currency: string;
	value: number;
}

export class CurrenciesRepository {
	async getCurrency(currency: string): Promise<Currencies> {
		return new Currencies();
	}

	async createCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		return new Currencies();
	}
}

@Injectable()
export class CurrenciesService {
	constructor(private readonly currenciesRepository: CurrenciesRepository) {}
	async getCurrency(currency: string): Promise<Currencies> {
		return await this.currenciesRepository.getCurrency(currency);
	}

	async createCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		if (value <= 0) {
			throw new BadRequestException('The value must be greater zero.');
		}

		return await this.currenciesRepository.createCurrency({
			currency,
			value,
		});
	}
}
