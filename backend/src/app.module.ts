import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsModule } from './operations/operations.module';
import { User } from './types/user.entity';
import { Operation } from './types/operation.entity';
import { RecordsModule } from './records/records.module';
import { Record } from './types/record.entity';
import { AuthModule } from './auth/auth.module';
import * as cors from 'cors';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: 'mypassword',
      database: 'calculator',
      entities: [User, Operation, Record],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Operation, Record]),
    UsersModule,
    AuthModule,
    OperationsModule,
    RecordsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
