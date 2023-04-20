import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Record } from 'src/types/record.entity';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  async getPage(page = 1, limit = 10): Promise<Record[]> {
    const skippedItems = (page - 1) * limit;

    return await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.user', 'user')
      .leftJoinAndSelect('record.operation', 'operation')
      .orderBy('record.date', 'DESC')
      .skip(skippedItems)
      .take(limit)
      .getMany();
  }

  findOne(id: number): Promise<Record> {
    return this.recordRepository.findOneByOrFail({ id });
  }

  async create(record: Record): Promise<Record> {
    return await this.recordRepository.save(record);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.recordRepository.delete(id);
  }
}
