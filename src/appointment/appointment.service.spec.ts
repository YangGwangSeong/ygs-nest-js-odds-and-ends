import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
	let service: AppointmentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AppointmentService],
		}).compile();

		service = module.get<AppointmentService>(AppointmentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should schedule an unconfirmed appointment for a user on success', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = new Date('2022-01-01T15:00:00Z');

		const newAppointment = service.scheduleAppointment({
			patientId: 1,
			startTime,
			endTime,
		});

		expect(newAppointment).toEqual({
			patientId: 1,
			startTime,
			endTime,
			confirmed: false,
		});
	});

	// 에러가 나는 테스트코드 즉, toThrowError는 해당 startTime과 endTime으로 인해서 발생하는
	// 에러가 발생해야하고, 그리고 appointment's endTime should be after startTime 이러한 에러 메세지가 나와야함.
	it('should throw an error when end time is before start time', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = new Date('2022-01-01T13:00:00Z');
		/**
		 * We have to wrap our "scheduleAppointment" function in another arrow function
		 * because we expect an error to be thrown. If we don't do that,
		 * Jest won't be able to properly handle the error and it will accuse that the test failed.
		 */
		expect(() =>
			service.scheduleAppointment({
				patientId: 1,
				startTime,
				endTime,
			}),
		).toThrowError("appointment's endTime should be after startTime");
	});

	// 시작시간과 끝나는시간이 같을때 에러
	it('should throw an error when end time is equal to start time', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = startTime;

		expect(() =>
			service.scheduleAppointment({
				patientId: 1,
				startTime,
				endTime,
			}),
		).toThrowError("appointment's endTime should be after startTime");
	});

	// 시작시간 일자와 끝나는시간 일자가 다를때 에러
	it('should throw an error when end time is in the next day', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = new Date('2022-01-02T14:00:00Z');

		expect(() =>
			service.scheduleAppointment({
				patientId: 1,
				startTime,
				endTime,
			}),
		).toThrowError(
			"appointment's endTime should be in the same day as start time's",
		);
	});

	// 시작시간 월수와 끝나는시간 월수가 다를때 에러
	it('should throw an error when end time is in same day and hour of next month', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = new Date('2022-02-01T14:00:00Z');

		expect(() =>
			service.scheduleAppointment({
				patientId: 1,
				startTime,
				endTime,
			}),
		).toThrowError(
			"appointment's endTime should be in the same day as start time's",
		);
	});

	// 시작시간 년도와 끝나는시간 년도가 다를때 에러
	it('should throw an error when end time is in same day, hour and month of the next year', () => {
		const startTime = new Date('2022-01-01T14:00:00Z');
		const endTime = new Date('2023-01-01T14:00:00Z');

		expect(() =>
			service.scheduleAppointment({
				patientId: 1,
				startTime,
				endTime,
			}),
		).toThrowError(
			"appointment's endTime should be in the same day as start time's",
		);
	});

	// 여기까지가 단위테스트
});
