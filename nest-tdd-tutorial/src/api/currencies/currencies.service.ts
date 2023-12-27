import { Injectable, InternalServerErrorException } from '@nestjs/common';

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
		try {
			return await this.currenciesRepository.getCurrency(currency);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async createCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		try {
			return await this.currenciesRepository.createCurrency({
				currency,
				value,
			});
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
