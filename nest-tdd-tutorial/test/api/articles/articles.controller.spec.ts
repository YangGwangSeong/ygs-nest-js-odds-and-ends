import { ArticlesController } from '@/api/articles/articles.controller';
import { ArticlesService } from '@/api/articles/articles.service';
import { ExchangeInputDto } from '@/api/articles/dto/exchange-input.dto';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('ArticlesController', () => {
	let controller: ArticlesController;
	let service: ArticlesService;
	let mockData: ExchangeInputDto;

	beforeEach(async () => {
		const articlesMockService = {
			convertAmount: jest.fn(),
		};
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ArticlesController],
			providers: [
				{
					provide: ArticlesService,
					useFactory: () => articlesMockService,
				},
			],
		}).compile();

		controller = module.get<ArticlesController>(ArticlesController);
		service = module.get<ArticlesService>(ArticlesService);
		mockData = {
			from: 'USD',
			to: 'BRL',
			amount: 1,
		} satisfies ExchangeInputDto;
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	// 1. controller convertAmount 메소드
	describe('convertAmount()', () => {
		// 1-1 convertAmount 메소드 promise로 service에서 에러가 발생 하는지
		it('should be throw when service throw', async () => {
			// service의 return값을 mocking 하여 에러를 던져주게 한다.
			(service.convertAmount as jest.Mock).mockRejectedValue(
				new BadRequestException(),
			);
			await expect(controller.convertAmount(mockData)).rejects.toThrow(
				new BadRequestException(),
			);
		});

		// 1-2 controller에서 전달된 service에 파라미터가 정확한지 테스트
		it('should be called service with corrects params', async () => {
			await controller.convertAmount(mockData);
			expect(service.convertAmount).toBeCalledWith(mockData);
		});

		// 1-3 controller에서 호출한 service return값이 맞는지 테스트
		it('should be returns when service returns', async () => {
			const mockReturn: { amount: number } = { amount: 1 };
			// service의 리턴값을 던져준다.
			(service.convertAmount as jest.Mock).mockResolvedValue(mockReturn);
			expect(await controller.convertAmount(mockData)).toEqual(mockReturn);
		});
	});
});
