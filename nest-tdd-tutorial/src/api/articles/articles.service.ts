import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
	async convertAmount({
		from,
		to,
		amount,
	}: {
		from: any;
		to: any;
		amount: any;
	}): Promise<any> {
		if (!from || !to || !amount) {
			throw new BadRequestException();
		}
	}
}
