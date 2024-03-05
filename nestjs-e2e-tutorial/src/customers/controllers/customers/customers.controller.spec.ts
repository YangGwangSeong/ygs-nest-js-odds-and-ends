import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from 'src/customers/services/customers/customers.service';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: 'CUSTOMERS_SERVICE',
          useValue: {
            findCustomer: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>('CUSTOMERS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined customersService', () => {
    expect(customersService).toBeDefined();
  });
});
