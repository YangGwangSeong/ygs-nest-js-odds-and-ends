import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { CurrenciesRepository } from './currencies.repository';
import { Currencies } from './currencies.entity';

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

	async updateCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		if (value <= 0) {
			throw new BadRequestException('The value must be greater zero.');
		}

		return await this.currenciesRepository.updateCurrency({
			currency,
			value,
		});
	}

	async deleteCurrency(currency: string): Promise<void> {
		return await this.currenciesRepository.deleteCurrency(currency);
	}
}
