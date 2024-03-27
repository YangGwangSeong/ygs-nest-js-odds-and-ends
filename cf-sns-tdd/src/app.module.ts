import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModel } from './posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/../.${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const option = {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          database: configService.get('DB_DATABASE'),
          password: configService.get('DB_PASSWORD'),
          entities: [PostsModel, UsersModel],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        };

        return option;
      },
    }),
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
