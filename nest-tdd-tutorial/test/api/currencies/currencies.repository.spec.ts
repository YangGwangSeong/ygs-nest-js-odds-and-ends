import { Currencies } from '@/api/currencies/currencies.entity';
import { CurrenciesRepository } from '@/api/currencies/currencies.repository';
import {
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
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
			save: jest.fn(),
			delete: jest.fn(),
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
		// beforeEach(() => {
		// 	currenciesRepository.save = jest.fn();
		// });

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
			expect(reposiotry.createCurrency(mockData)).rejects.toThrow();
		});

		// 3-4 repository createCurrency 메소드의 파라미터가 올바르지 않을떄 에러
		it('should be throw if called with invalid params', async () => {
			// entity에서 validate currency가 길이가 최소 3 최대 3가 아니면 에러
			mockData.currency = 'INVALID';
			expect(reposiotry.createCurrency(mockData)).rejects.toThrow();

			// entity에서 validate value가 number가 아니면 에러
			mockData.currency = 'USD';
			mockData.value = 'INVALID' as any; // 에러를 발생 시키기 위해 타입 캐스팅
			expect(reposiotry.createCurrency(mockData)).rejects.toThrow();
		});

		// 3-3 repository save 메소드가 성공 했을때 return 데이터
		it('should be returns created data', async () => {
			expect(await reposiotry.createCurrency(mockData)).toEqual(mockData);
		});
	});

	// 4. updateCurrency 메소드
	describe('updateCurrency()', () => {
		// 4-1. repository findOne 파라미터값 맞는지
		it('should be called findOne with correct params', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);
			await reposiotry.updateCurrency(mockData);
			expect(currenciesRepository.findOneBy).toBeCalledWith({
				currency: 'USD',
			});
		});

		// 4-2 findOne 리턴값이 undefined면 에러 throw
		it('should be throw findOne returns empty', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(undefined);
			await expect(reposiotry.updateCurrency(mockData)).rejects.toThrow(
				new NotFoundException(`The currency ${mockData.currency} not found!`),
			);
		});

		// 4-3 updateCurrency 메소드의 파라미터와 repository.save함수의 파라미터가 같은지 확인
		it('should be called save with correct params', async () => {
			// 1. find로 해당 데이터 찾기
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);

			currenciesRepository.save = jest.fn().mockReturnValue(mockData);
			await reposiotry.updateCurrency(mockData);
			expect(currenciesRepository.save).toBeCalledWith(mockData);
		});

		// 4-4 repository save 함수가 에러가 났을때
		it('should be throw when save thorw', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);
			// 모킹 함수로 실패 했을때 에러를 던져줌
			// mockRejectedValue와 mockReturnValue를 헷갈리면 안됨.
			// mockRejectedValue는 모킹 함수의 return 값으로 에러를 던져 주는거고
			// mockReturnValue는 value 값들을 던져줌
			currenciesRepository.save = jest.fn().mockRejectedValue(new Error());
			expect(reposiotry.updateCurrency(mockData)).rejects.toThrow();
		});

		// 4-5 updateCurrency 성공시 리턴 데이터
		it('should be returns updated data', async () => {
			const updateMockData = { currency: 'USD', value: 2 };

			currenciesRepository.findOneBy = jest
				.fn()
				.mockReturnValue({ currency: 'USD', value: 1 }); // 변경전 데이터 {currency: 'USD', value: 1}
			currenciesRepository.save = jest.fn().mockReturnValue({}); // 저장 성공 했을때 리턴값이 없음 void라 빈 객체
			const result = await reposiotry.updateCurrency(updateMockData);
			expect(result).toEqual(updateMockData); // 업데이트에 성공 했을때 리턴값이 {currency: 'USD', value: 2}인지 확인
		});
	});

	// 5. deleteCurrency 메소드
	describe('deleteCurrency()', () => {
		// 5-1. repository findOne 파라미터값 맞는지
		it('should be called findOne with correct params', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);
			await reposiotry.deleteCurrency('USD');
			expect(currenciesRepository.findOneBy).toBeCalledWith({
				currency: 'USD',
			});
		});

		// 5-2 findOne 리턴값이 undefined면 에러 throw
		it('should be throw findOne returns empty', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(undefined);
			await expect(reposiotry.deleteCurrency('USD')).rejects.toThrow(
				new NotFoundException(`The currency ${mockData.currency} not found!`),
			);
		});

		// 5-3 delete 파라미터값 맞는지
		it('should be called delete with correct params', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);
			currenciesRepository.delete = jest.fn().mockReturnValue({}); // 리턴값이 void라 빈객체를 mockReturnValue로 받음
			await reposiotry.deleteCurrency('USD');
			expect(currenciesRepository.delete).toBeCalledWith({
				currency: 'USD',
			});
		});

		// 5-4 delete 함수가 에러가 났을때
		it('should be throw when delete thorw', async () => {
			currenciesRepository.findOneBy = jest.fn().mockReturnValue(mockData);
			currenciesRepository.delete = jest.fn().mockRejectedValue(new Error());
			expect(reposiotry.deleteCurrency('USD')).rejects.toThrow();
		});
	});
});
