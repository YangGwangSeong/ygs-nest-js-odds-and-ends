import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateOrReject } from 'class-validator';
import { CreateCurrencyDto } from './dto/create-currency.dto';

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
		createCurrencyDto: CreateCurrencyDto,
	): Promise<Currencies> {
		const createCurrency = new Currencies();
		Object.assign(createCurrency, createCurrencyDto);

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
	}: CreateCurrencyDto): Promise<Currencies> {
		const result = await this.repository.findOneBy({ currency });

		if (!result) {
			throw new NotFoundException(`The currency ${currency} not found!`);
		}

		result.value = value;

		try {
			await this.repository.save(result);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}

		return result;
	}

	async deleteCurrency(currency: string): Promise<void> {
		const result = await this.repository.findOneBy({ currency });
		if (!result) {
			throw new NotFoundException(`The currency ${currency} not found!`);
		}

		await this.repository.delete({ currency });
	}
}
