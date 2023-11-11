import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '@/api/articles/articles.service';
import { BadRequestException } from '@nestjs/common';

describe('ArticlesService', () => {
	let service: ArticlesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ArticlesService],
		}).compile();

		service = module.get<ArticlesService>(ArticlesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('convertAmount()', () => {
		it('should be throw if called with invalid params', async () => {
			await expect(
				service.convertAmount({ from: '', to: '', amount: 0 }),
			).rejects.toThrow(new BadRequestException());
		});

		it('should be not throw if called with valid params', async () => {
			await expect(
				service.convertAmount({ from: 'USD', to: 'BRL', amount: 1 }),
			).resolves.not.toThrow();
		});
	});
});
