import { CurrenciesController } from '@/api/currencies/currencies.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CurrenciesController', () => {
	let controller: CurrenciesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CurrenciesController],
		}).compile();

		controller = module.get<CurrenciesController>(CurrenciesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
