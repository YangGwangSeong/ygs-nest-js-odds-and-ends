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
	let mockData: Currencies;

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
		mockData = { currency: 'USD', value: 1 };
	});

	// 1. 해당 service든 repository든 정의 되어 있는지 체크
	it('should be defined', () => {
		expect(reposiotry).toBeDefined();
	});

	// 2. getCurrency 메소드
	describe('getCurrency()', () => {
		// 2-1. repository findOneBy 파라미터값 맞는지
		it('should be called findOneBy with correct params', async () => {
			(currenciesRepository.findOneBy as jest.Mock).mockReturnValue({});
			await reposiotry.getCurrency('USD');
			expect(currenciesRepository.findOneBy).toBeCalledWith({
				currency: 'USD',
			});
		});

		// 2-2. findOneBy의 return값이 null일때 에러 테스트
		it('should be throw findOneBy returns empty', async () => {
			(currenciesRepository.findOneBy as jest.Mock).mockReturnValue(null);
			expect(reposiotry.getCurrency('USD')).rejects.toThrow(
				new InternalServerErrorException(),
			);
		});

		// 2-3. findOneBy 정상적으로 동작하는 return값 Promise 리턴 받으니까 await 붙여야함
		it('should be returns when findOne returns', async () => {
			(currenciesRepository.findOneBy as jest.Mock).mockReturnValue(mockData);
			expect(await reposiotry.getCurrency('USD')).toEqual(mockData);
		});
	});

	// 3. createCurrency 메소드
	describe('createCurrency()', () => {
		// beforEach는 해당 테스트가 실행되기전에 콜백 함수안에 있는것들을 실행 해주는거
		// save는 해당 테스트에서만 사용 되니까 해당 테스트 코드 안에서만 미리 불러올 수 있게 beforEach로 모킹 함수를 생성한것 같다!
		beforeEach(() => {
			currenciesRepository.save = jest.fn();
		});

		// 3-1 repository create 메소드 파라미터 맞는지
		it('should be called save with correct params', async () => {
			currenciesRepository.save = jest.fn().mockReturnValue(mockData);
			await reposiotry.createCurrency(mockData);
			expect(currenciesRepository.save).toBeCalledWith(mockData);
		});

		// 3-2 repository save 함수가 에러가 났을때
		it('should be throw when save thorw', async () => {
			// 모킹 함수로 실패 했을때 에러를 던져줌
			currenciesRepository.save = jest.fn().mockRejectedValue(new Error());
			await expect(reposiotry.createCurrency(mockData)).rejects.toThrow();
		});
	});
});
