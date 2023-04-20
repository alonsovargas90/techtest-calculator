import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { v4 as UniqueID } from 'UUID';
import { Record } from '../types/record.entity';
import { RecordsService } from './records.service';
import { OperationsService } from '../operations/operations.service';
import { UsersService } from '../users/users.service';

@Controller('records')
export class RecordsController {
  constructor(
    private readonly recordService: RecordsService,
    // @Inject(OperationsService)
    // private readonly operationsService: OperationsService,
    // @Inject(UsersService)
    // private readonly userService: UsersService,
  ) {}

  @Get()
  getPage(): Promise<Record[]> {
    return this.recordService.getPage();
  }

  @Post()
  async createRecord(@Body() body: any): Promise<Record> {
    if (!body.user_id || !body.operation_id) {
      throw new HttpException('Missing Params', HttpStatus.BAD_REQUEST);
    }

    //Get The Objs
    // const user = await this.userService.findOne(body.user_id);
    // const operation = await this.operationsService.findOne(body.operation_id);
    // if (!operation || !user) {
    //   const err = !operation ? 'Missmatch Operation Id' : 'Missmatch User Id';
    //   throw new HttpException(err, HttpStatus.BAD_REQUEST);
    // }

    const newRecord = {
      ...body,
      id: UniqueID(),
    //   user,
    //   operation,
    };
    return await this.recordService.create(newRecord);
  }
}
