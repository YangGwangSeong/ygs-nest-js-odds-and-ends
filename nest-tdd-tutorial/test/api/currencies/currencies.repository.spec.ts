import { CurrenciesModule } from '@/api/currencies/currencies.module';
import { CurrenciesRepository } from '@/api/currencies/currencies.repository';
import { Test, TestingModule } from '@nestjs/testing';

/**
 *
 * Repository 단위테스트 작성
 */
describe('CurrenciesRepository', () => {
	let reposiotry: CurrenciesRepository;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CurrenciesRepository],
		}).compile();

		reposiotry = module.get<CurrenciesRepository>(CurrenciesRepository);
	});

	// 1. 해당 service든 repository든 정의 되어 있는지 체크
	it('should be defined', () => {
		expect(reposiotry).toBeDefined();
	});
});
