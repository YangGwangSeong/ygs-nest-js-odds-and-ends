import { CurrenciesController } from '@/api/currencies/currencies.controller';
import { Currencies } from '@/api/currencies/currencies.entity';
import { CurrenciesService } from '@/api/currencies/currencies.service';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('CurrenciesController', () => {
	let controller: CurrenciesController;
	let service: CurrenciesService;
	let mockData: Currencies;

	beforeEach(async () => {
		const CurrenciesServiceMock = {
			getCurrency: jest.fn(),
			createCurrency: jest.fn(),
			deleteCurrency: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [CurrenciesController],
			providers: [
				{
					provide: CurrenciesService,
					useFactory: () => CurrenciesServiceMock,
				},
			],
		}).compile();

		controller = module.get<CurrenciesController>(CurrenciesController);
		service = module.get<CurrenciesService>(CurrenciesService);
		mockData = { currency: 'USD', value: 1 };
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	// 1. controller getCurrency 메소드
	describe('getCurrency()', () => {
		// 1-1 getCurrency 메소드 promise로 service에서 에러가 발생 하는지
		it('should be throw when service throw', async () => {
			// service의 return값을 mocking 하여 에러를 던져주게 한다.
			(service.getCurrency as jest.Mock).mockRejectedValue(
				new BadRequestException(),
			);
			await expect(controller.getCurrency('INVALID')).rejects.toThrow(
				new BadRequestException(),
			);
		});

		// 1-2 controller에서 전달된 service에 파라미터가 정확한지 테스트
		it('should be called service with corrects params', async () => {
			await controller.getCurrency('USD');
			expect(service.getCurrency).toBeCalledWith('USD');
		});

		// 1-3 controller에서 호출한 service return값이 맞는지 테스트
		it('should be returns when service returns', async () => {
			// service의 리턴값을 던져준다.
			(service.getCurrency as jest.Mock).mockResolvedValue(mockData);
			expect(await controller.getCurrency('USD')).toEqual(mockData);
		});
	});

	// 2. controller createCurrency 메소드
	describe('createCurrency()', () => {
		// 2-1 createCurrency 메소드 promise로 service에서 에러가 발생 하는지
		it('should be throw when service throw', async () => {
			// service의 return값을 mocking 하여 에러를 던져주게 한다.
			(service.createCurrency as jest.Mock).mockRejectedValue(
				new BadRequestException(),
			);
			await expect(controller.createCurrency(mockData)).rejects.toThrow(
				new BadRequestException(),
			);
		});

		// 2-2 controller에서 전달된 service에 파라미터가 정확한지 테스트
		it('should be called service with corrects params', async () => {
			await controller.createCurrency(mockData);
			expect(service.createCurrency).toBeCalledWith(mockData);
		});

		// 2-3 controller에서 호출한 service return값이 맞는지 테스트
		it('should be returns when service returns', async () => {
			// service의 리턴값을 던져준다.
			(service.createCurrency as jest.Mock).mockResolvedValue(mockData);
			expect(await controller.createCurrency(mockData)).toEqual(mockData);
		});
	});

	// 3. controller deleteCurrency 메소드
	describe('deleteCurrency()', () => {
		// 1-1 deleteCurrency 메소드 promise로 service에서 에러가 발생 하는지
		it('should be throw when service throw', async () => {
			// service의 return값을 mocking 하여 에러를 던져주게 한다.
			(service.deleteCurrency as jest.Mock).mockRejectedValue(
				new BadRequestException(),
			);
			await expect(controller.deleteCurrency('INVALID')).rejects.toThrow(
				new BadRequestException(),
			);
		});

		// 2-2 controller에서 전달된 service에 파라미터가 정확한지 테스트
		it('should be called service with corrects params', async () => {
			await controller.deleteCurrency('USD');
			expect(service.deleteCurrency).toBeCalledWith('USD');
		});
	});
});
