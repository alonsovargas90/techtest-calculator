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

  @Get('/:id')
  async getById(@Param() params: { id: number }): Promise<Operation> {
    console.log('asking for Operation...', params.id);
    return await this.operationService.findOne(params.id);
  }

  @Post()
  async createOperation(@Body() body: Operation): Promise<Operation> {
    console.log('creating Operation...', body);
    return await this.operationService.create(body);
  }
}
