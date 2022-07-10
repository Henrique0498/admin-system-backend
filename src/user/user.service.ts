import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

type DeleteOneResultType = { acknowledged: boolean; deletedCount: number };

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async getUser(username: string): Promise<User | null> {
    const resultQuery = await this.UserModel.findOne({ username }).exec();

    if (!resultQuery) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Este usuário não existe.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return resultQuery;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    this.create(createUserDto);
  }

  async updateUser(updateUserDto: CreateUserDto): Promise<User> {
    const parameterUpdate = { username: updateUserDto.username };
    const valueUpdate = {
      $set: updateUserDto,
    };

    return await this.UserModel.findOneAndUpdate(
      parameterUpdate,
      valueUpdate,
    ).exec();
  }

  async deleteUser(username: string): Promise<DeleteOneResultType> {
    return await this.UserModel.deleteOne({ username }).exec();
  }

  private async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreate = new this.UserModel(createUserDto);

    return await userCreate.save();
  }
}
