import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { User } from '../types/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/active')
  getAllActive(): Promise<User[]> {
    return this.usersService.findAllActive();
  }

  @Get('/:id')
  async getById(@Param() params: { id: number }): Promise<User> {
    console.log('asking for User...', params.id);
    return await this.usersService.findOne(params.id);
  }

  @Post()
  async createUser(@Body() body: User): Promise<User> {
    console.log('creating User...', body);
    return await this.usersService.create(body);
  }

  @Post('validate')
  async validateUser(@Body() body: any): Promise<boolean> {
    console.log('validating User...', body);
    return await this.usersService.validateLogin(body.name, body.password);
  }
}
