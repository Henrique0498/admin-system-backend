import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/user')
export class UserController {
  @Post()
  async createUser() {
    return JSON.stringify({ teste: 'teste' });
  }
}
