import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Record } from '../types/record.entity';
import { RecordsService } from './records.service';
import { OperationsService } from 'src/operations/operations.service';
import { UsersService } from 'src/users/users.service';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordService: RecordsService,
    private readonly operationService: OperationsService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getPage(): Promise<Record[]> {
    return this.recordService.getPage();
  }

  @Post()
  async createRecord(@Body() body: any): Promise<Record> {
    const user = await this.userService.findOne(body.user_id);
    const operation = await this.userService.findOne(body.operation_id);

    // TODO add once throw for each
    if (!user || !operation) {
      throw new HttpException('Ids mismatch', HttpStatus.BAD_REQUEST);
    }
    const newRecord = {
      ...body,
      user,
      operation,
    };
    return await this.recordService.create(newRecord);
  }
}
