import { Test, TestingModule } from '@nestjs/testing';
import {
	CurrenciesRepository,
	CurrenciesService,
} from '@/api/currencies/currencies.service';
import {
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';

describe('CurrenciesService', () => {
	let service: CurrenciesService;
	let repository: CurrenciesRepository;
	let mockData: { currency: string; value: number };

	beforeEach(async () => {
		const currenciesRepositoryMock = {
			getCurrency: jest.fn(),
			createCurrency: jest.fn(),
			updateCurrency: jest.fn(),
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CurrenciesService,
				{
					provide: CurrenciesRepository,
					useFactory: () => currenciesRepositoryMock,
				},
			],
		}).compile();

		service = module.get<CurrenciesService>(CurrenciesService);
		repository = module.get<CurrenciesRepository>(CurrenciesRepository);
		mockData = { currency: 'USD', value: 1 };
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getCurrency()', () => {
		it('should be throw if repository throw', async () => {
			//repository의 getCurrency 메소드를 비동이 실패값을 mockRejectedValue로 반환해줌
			(repository.getCurrency as jest.Mock).mockRejectedValue(
				new InternalServerErrorException(),
			);
			await expect(service.getCurrency('INVALID')).rejects.toThrow(
				new InternalServerErrorException(),
			);
		});

		//is repository
		it('should be not throw if repository returns', async () => {
			await expect(service.getCurrency('USD')).resolves.not.toThrow();
		});

		it('should be called repository with correct params', async () => {
			await service.getCurrency('USD');
			expect(repository.getCurrency).toBeCalledWith('USD');
		});

		it('should be return when repository return', async () => {
			(repository.getCurrency as jest.Mock).mockReturnValue(mockData);
			expect(await service.getCurrency('USD')).toEqual(mockData);
		});
	});

	// 단위 테스트 작성 루틴
	// 1. describe으로 메소드 정의하고
	// 2. 해당 메소드에 해당하는 repository 오류 테스트코드 작성
	// 3. 해당 repository 오류가 없을때 리턴값 작성
	// 4. 해당 메소드의 parameter값이 올바른지 테스트 작성
	// 5. 리턴값이 올바른지 테스트 작성
	describe('createCurrency()', () => {
		it('should be throw if repository throw', async () => {
			(repository.createCurrency as jest.Mock).mockRejectedValue(
				new InternalServerErrorException(),
			);
			mockData.currency = 'INVALID';
			await expect(service.createCurrency(mockData)).rejects.toThrow(
				new InternalServerErrorException(),
			);
		});

		it('should be not throw if repository retunrs', async () => {
			await expect(service.createCurrency(mockData)).resolves.not.toThrow();
		});

		it('should be called repository with correct params', async () => {
			await service.createCurrency(mockData);
			expect(repository.createCurrency).toBeCalledWith(mockData);
		});

		// value값이 0보다 작을경우 에러 테스트 코드
		it('should be throw if value <= 0', async () => {
			mockData.value = 0;
			await expect(service.createCurrency(mockData)).rejects.toThrow(
				new BadRequestException('The value must be greater zero.'),
			);
		});

		it('should be return when repository return', async () => {
			(repository.createCurrency as jest.Mock).mockReturnValue(mockData);
			expect(await service.createCurrency(mockData)).toEqual(mockData);
		});
	});

	// 3번째 update
	describe('updateCurrency()', () => {
		// repository의 메소드가 없으면 에러 던짐
		it('should be throw if repository throw', async () => {
			(repository.updateCurrency as jest.Mock).mockRejectedValue(
				new InternalServerErrorException(),
			);
			mockData.currency = 'INVALID';
			await expect(service.updateCurrency(mockData)).rejects.toThrow(
				new InternalServerErrorException(),
			);
		});

		// 에러 없고 repository리턴값 있을때
		it('should be not throw if repository retunrs', async () => {
			await expect(service.updateCurrency(mockData)).resolves.not.toThrow();
		});

		// repository의 파라미터가 값이 맞는지 확인
		it('should be called repository with correct params', async () => {
			await service.updateCurrency(mockData);
			expect(repository.updateCurrency).toBeCalledWith(mockData);
		});

		// value값이 0보다 작을경우 에러 테스트 코드
		it('should be throw if value <= 0', async () => {
			mockData.value = 0;
			await expect(service.updateCurrency(mockData)).rejects.toThrow(
				new BadRequestException('The value must be greater zero.'),
			);
		});

		// 모킹함수 repository의 return값 확인 테스트 코드
		it('should be return when repository return', async () => {
			(repository.updateCurrency as jest.Mock).mockReturnValue(mockData);
			expect(await service.updateCurrency(mockData)).toEqual(mockData);
		});
	});
});
