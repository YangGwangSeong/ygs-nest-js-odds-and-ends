import { Injectable } from '@nestjs/common';

export interface Appointment {
	patientId: number;
	startTime: Date;
	endTime: Date;
	confirmed: boolean;
}

export interface AppointmentInput {
	patientId: number;
	startTime: Date;
	endTime: Date;
}
@Injectable()
export class AppointmentService {
	public scheduleAppointment(appointmentData: AppointmentInput): Appointment {
		return {
			...appointmentData,
			confirmed: false,
		};
	}
}
