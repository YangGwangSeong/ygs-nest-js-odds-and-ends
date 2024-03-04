import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomersModule, PaymentsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
