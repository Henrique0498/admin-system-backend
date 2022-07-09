import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  @Get()
  async getUser(@Body() { username }: GetUserDto): Promise<User> {
    const resultGetUser = await this.userService.getUser(username);

    if (resultGetUser) {
      return resultGetUser;
    }

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Este usuário não existe.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
