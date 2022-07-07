import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    this.create(createUserDto);
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

    this.logger.log(`createUserDto: ${JSON.stringify(user)}`);
    this.users.push(user);
  }
}
