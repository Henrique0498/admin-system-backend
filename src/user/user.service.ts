import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    this.create(createUserDto);
  }

  async getUser(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username);
  }

  private create(userProps: CreateUserDto): void {
    const { name, username, email } = userProps;

    const user: User = {
      _id: uuid(),
      name,
      email,
      username,
      cards: null,
      earnings: null,
      expenses: null,
      expensesTotal: null,
      income: null,
      lastAccess: null,
      spending: null,
      spendingTotal: null,
    };

    this.users.push(user);
  }
}
