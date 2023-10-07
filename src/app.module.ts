import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AppointmentService } from './appointment/appointment.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService, AppointmentService],
})
export class AppModule {}
