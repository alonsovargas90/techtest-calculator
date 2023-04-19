import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Operation } from '../types/operation.entity';
import { OperationService } from './operation.service';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationService: OperationService) {}

  @Get()
  getAll(): Promise<Operation[]> {
    return this.operationService.findAll();
  }

  async create(user: Operation): Promise<Operation> {
    return await this.operationService.save(user);
  }
}
