import {
	Controller,
	Get,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ExchangeInputDto } from './dto/exchange-input.dto';

@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Get()
	@UsePipes(ValidationPipe)
	async convertAmount(@Query() query: ExchangeInputDto) {
		return this.articlesService.convertAmount(query);
	}
}
