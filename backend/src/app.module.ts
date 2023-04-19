import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationsModule } from './operations/operations.module';
import { User } from './types/user.entity';
import { Operation } from './types/operation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myuser',
      password: 'mypassword',
      database: 'calculator',
      entities: [User, Operation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Operation]),
    UsersModule,
    OperationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
