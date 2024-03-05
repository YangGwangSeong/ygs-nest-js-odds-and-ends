import { Controller, Get, Inject } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(
    @Inject('CUSTOMERS_SERVICE')
    private readonly customersService: CustomersService,
  ) {}
  @Get('customers')
  getCustomer() {
    return this.customersService.findCustomer();
  }
}
