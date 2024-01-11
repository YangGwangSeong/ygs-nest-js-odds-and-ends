import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesInputType } from './types/currencies-input.type';

@Injectable()
export class CurrenciesRepository extends Repository<Currencies> {
	constructor(
		@InjectRepository(Currencies)
		private readonly repository: Repository<Currencies>,
	) {
		super(repository.target, repository.manager, repository.queryRunner);
	}

	async getCurrency(currency: string): Promise<Currencies> {
		const result = await this.repository.findOneBy({ currency });

		if (!result) {
			throw new InternalServerErrorException();
		}

		return result;
	}

	async createCurrency(
		currenciesInputType: CurrenciesInputType,
	): Promise<Currencies> {
		const createCurrency = new Currencies();
		Object.assign(createCurrency, currenciesInputType);

		await this.repository.save(createCurrency);
		return new Currencies();
	}

	async updateCurrency({
		currency,
		value,
	}: CurrenciesInputType): Promise<Currencies> {
		return new Currencies();
	}

	async deleteCurrency(currency: string): Promise<void> {
		return;
	}
}
