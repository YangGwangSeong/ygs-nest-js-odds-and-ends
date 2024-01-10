import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

	async createCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		return new Currencies();
	}

	async updateCurrency({
		currency,
		value,
	}: {
		currency: string;
		value: number;
	}): Promise<Currencies> {
		return new Currencies();
	}

	async deleteCurrency(currency: string): Promise<void> {
		return;
	}
}
