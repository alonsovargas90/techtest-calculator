import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { Record } from '../types/record.entity';
import { RecordsService } from './records.service';
import { OperationsService } from '../operations/operations.service';
import { UsersService } from '../users/users.service';
import { DeleteResult } from 'typeorm';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordService: RecordsService,
    @Inject(OperationsService)
    private readonly operationsService: OperationsService,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  @Get()
  getPage(@Param() params: { page: number; limit: number }): Promise<Record[]> {
    return this.recordService.getPage(params.page, params.limit);
  }

  @Delete('/:id')
  deleteRecord(@Param() params: { id: number }): Promise<DeleteResult> {
    return this.recordService.delete(params.id);
  }

  @Post()
  async createRecord(@Body() body: any): Promise<Record> {
    if (!body.user_id || !body.operation_id) {
      throw new HttpException('Missing Params', HttpStatus.BAD_REQUEST);
    }

    //Get The Objs
    const user = await this.userService.findOne(body.user_id);
    const operation = await this.operationsService.findOne(body.operation_id);
    const newUserBalance = body.user_balance - operation.cost;

    if (!operation || !user) {
      const err = !operation ? 'Missmatch Operation Id' : 'Missmatch User Id';
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }

    if (newUserBalance <= 0) {
      throw new HttpException(
        'Error Not enough balance to process the request',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('body', body);
    const newRecordDTO = {
      ...body,
      user_balance: newUserBalance,
      // user,
      // operation,
      user: body.user_id,
      operation: body.operation_id,
    };
    console.log('newRecordDTO', newRecordDTO);
    return await this.recordService.create(newRecordDTO);
  }
}
