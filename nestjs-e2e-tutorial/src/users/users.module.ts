import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
