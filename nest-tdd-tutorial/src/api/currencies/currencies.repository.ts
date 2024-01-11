import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrenciesInputType } from './types/currencies-input.type';
import { validateOrReject } from 'class-validator';

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

		// save 되기전에 validate 체크 그 이후에 저장
		try {
			await validateOrReject(createCurrency);
			await this.repository.save(createCurrency);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}

		return createCurrency;
	}

	async updateCurrency({
		currency,
		value,
	}: CurrenciesInputType): Promise<Currencies> {
		const result = await this.repository.findOneBy({ currency });

		if (!result) {
			throw new NotFoundException(`The currency ${currency} not found!`);
		}

		return new Currencies();
	}

	async deleteCurrency(currency: string): Promise<void> {
		return;
	}
}
