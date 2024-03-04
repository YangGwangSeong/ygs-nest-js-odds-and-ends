import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'anson@gmail.com',
    },
    {
      email: 'stuy@gmail.com',
    },
    {
      email: 'arizona@gmail.com',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;

    const user = this.users.find((item) => item.email === email);

    if (user) {
      return {
        status: 'success',
      };
    } else {
      throw new BadRequestException();
    }
  }
}
