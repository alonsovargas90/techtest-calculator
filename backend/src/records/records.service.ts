import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      .orderBy('record.date', 'DESC')
      .skip(skippedItems)
      .take(limit)
      .getMany();
  }

  async create(user: Record): Promise<Record> {
    return await this.recordRepository.save(user);
  }
}
