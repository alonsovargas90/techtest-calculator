import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOneByName(name: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ name });
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async validateLogin(logInName: string, logInpass: string): Promise<boolean> {
    try {
      const foundUser: User = await this.findOneByName(logInName);
      return (
        foundUser &&
        foundUser.name === logInName &&
        foundUser.password === logInpass
      );
    } catch (e) {
      return false;
    }
  }
}
