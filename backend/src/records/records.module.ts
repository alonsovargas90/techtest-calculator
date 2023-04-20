import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from 'src/types/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { OperationsModule } from '../operations/operations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), OperationsModule, UsersModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
