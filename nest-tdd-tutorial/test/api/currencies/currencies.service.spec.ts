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
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CurrenciesService,
				{
					provide: CurrenciesRepository,
					useFactory: () => ({
						getCurrency: jest.fn(),
						createCurrency: jest.fn(),
					}),
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

		// value값이 0보다 작을경우 에러 테스트 코드
		it('should be throw if value <= 0', async () => {
			mockData.value = 0;
			await expect(service.createCurrency(mockData)).rejects.toThrow(
				new BadRequestException('The value must be greater zero.'),
			);
		});

		it('should be return when repository return', async () => {
			(repository.getCurrency as jest.Mock).mockReturnValue(mockData);
			expect(await service.getCurrency('USD')).toEqual(mockData);
		});
	});
});
