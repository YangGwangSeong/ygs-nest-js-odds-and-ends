import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
          entities: [],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        };

        return option;
      },
    }),
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
