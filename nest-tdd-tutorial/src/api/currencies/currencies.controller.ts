import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {
	constructor(private readonly currenciesService: CurrenciesService) {}

	@Get('/:currency')
	async getCurrency(@Param('currency') currency: string) {
		return await this.currenciesService.getCurrency(currency);
	}

	@Post()
	@UsePipes(ValidationPipe)
	async createCurrency(@Body() dto: CreateCurrencyDto) {
		return await this.currenciesService.createCurrency(dto);
	}

	@Delete('/:currency')
	async deleteCurrency(@Param('currency') currency: string) {
		return await this.currenciesService.deleteCurrency(currency);
	}
}
