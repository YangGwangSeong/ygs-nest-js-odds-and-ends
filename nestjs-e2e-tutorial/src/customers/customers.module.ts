import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCutomerModdleware } from './middlewares/validate-customer.middleware';

@Module({
  controllers: [CustomersController],
  providers: [
    {
      provide: 'CUSTOMERS_SERVICE',
      useClass: CustomersService,
    },
  ],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCutomerModdleware)
      .exclude({
        path: 'create',
        method: RequestMethod.POST,
      })
      .forRoutes(CustomersController);
  }
}
