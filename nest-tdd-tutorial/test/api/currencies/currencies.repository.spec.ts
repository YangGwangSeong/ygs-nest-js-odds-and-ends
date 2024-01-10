import { Currencies } from '@/api/currencies/currencies.entity';
import { CurrenciesModule } from '@/api/currencies/currencies.module';
import { CurrenciesRepository } from '@/api/currencies/currencies.repository';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 *
 * Repository 단위테스트 작성
 * createTesting Module 생성할때
 */
describe('CurrenciesRepository', () => {
	let reposiotry: CurrenciesRepository;
	let currenciesRepository: Repository<Currencies>;

	beforeEach(async () => {
		const CurrenciesRepositoryMock = {
			findOneBy: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CurrenciesRepository,
				{
					provide: getRepositoryToken(Currencies), // getRepositoryToken 함수 사용
					useFactory: () => CurrenciesRepositoryMock,
				},
			],
		}).compile();

		reposiotry = module.get<CurrenciesRepository>(CurrenciesRepository);
		currenciesRepository = module.get<Repository<Currencies>>(
			getRepositoryToken(Currencies), // 여기에도 꼭 getRepositoryToken 함수 사용
		);
	});

	// 1. 해당 service든 repository든 정의 되어 있는지 체크
	it('should be defined', () => {
		expect(reposiotry).toBeDefined();
	});

	// 2. getCurrency 메소드
	describe('getCurrency()', () => {
		// repository findOneBy
		it('should be called findOne with correct params', async () => {
			(currenciesRepository.findOneBy as jest.Mock).mockReturnValue({});
			await reposiotry.getCurrency('USD');
			expect(currenciesRepository.findOneBy).toBeCalledWith({
				currency: 'USD',
			});
		});

		// 에러 발생하는 곳
		it('should be throw findOne returns empty', async () => {
			(currenciesRepository.findOneBy as jest.Mock).mockReturnValue(undefined);
			expect(reposiotry.getCurrency('USD')).rejects.toThrow(
				new InternalServerErrorException(),
			);
		});
	});
});
