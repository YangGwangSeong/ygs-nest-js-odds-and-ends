import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [CustomersModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
