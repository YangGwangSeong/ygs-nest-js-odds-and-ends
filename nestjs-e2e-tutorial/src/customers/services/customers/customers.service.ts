import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
    },
  ];
  findCustomerById(id: number) {
    return {
      id: 1,
    };
  }
}
