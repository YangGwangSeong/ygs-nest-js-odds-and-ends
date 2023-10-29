import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentService } from './appointment/appointment.service';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
	imports: [PatientModule, AppointmentModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
