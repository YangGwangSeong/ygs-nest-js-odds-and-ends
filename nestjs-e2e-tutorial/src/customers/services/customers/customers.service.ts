import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/controllers/dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
      email: '1',
      name: '1',
    },
    {
      id: 2,
      email: '2',
      name: '2',
    },
    {
      id: 3,
      email: '3',
      name: '3',
    },
  ];

  findCustomerById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    this.users = [...this.users, createCustomerDto];
  }

  getCustomers() {
    return this.users;
  }
}
