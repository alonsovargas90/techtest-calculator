import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Operation } from './operation.entity';
import { User } from './user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Operation)
  @JoinColumn()
  operation: Operation;

  @ManyToMany(() => User)
  @JoinColumn()
  user: User;

  @Column()
  amount: number;

  @Column()
  user_balance: number;

  @Column()
  operation_response: string;

  @Column()
  date: Date;
}
