import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ControllerController } from './controller/controller.controller';

@Module({
  providers: [ServicesService],
  controllers: [ControllerController]
})
export class UsersModule {}
