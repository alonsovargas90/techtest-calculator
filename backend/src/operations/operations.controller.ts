import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Operation } from '../types/operation.entity';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationService: OperationsService) {}

  @Get()
  getAll(): Promise<Operation[]> {
    return this.operationService.findAll();
  }
  @Post()
  async createUser(@Body() body: Operation): Promise<Operation> {
    console.log('creating Operation...', body);
    return await this.operationService.create(body);
  }
}
