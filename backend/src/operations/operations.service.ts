import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from '../types/operation.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
  ) {}

  findAll(): Promise<Operation[]> {
    return this.operationRepository.find();
  }

  findOne(id: number): Promise<Operation> {
    return this.operationRepository.findOneByOrFail({ id });
  }

  async create(user: Operation): Promise<Operation> {
    return await this.operationRepository.save(user);
  }
}
