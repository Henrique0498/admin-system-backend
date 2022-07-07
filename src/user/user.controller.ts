import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('api/v1/user')
export class UserController {
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    return JSON.stringify(`{ "email": ${email} }`);
  }
}
