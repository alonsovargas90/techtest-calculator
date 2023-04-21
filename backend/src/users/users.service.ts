import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../types/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findAllActive(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        status: 'Active',
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  findOneByUserName(username: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ username });
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
