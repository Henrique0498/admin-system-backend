import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { UserValidateParamsPipes } from './pipes/user-validate-params.pipes';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  @Get()
  async getUser(@Body() { username }: GetUserDto): Promise<User> {
    const resultGetUser = await this.userService.getUser(username);

    if (resultGetUser) {
      return resultGetUser;
    }
  }

  @Patch()
  async updateUser(@Body() getUserDto: UpdateUserDto): Promise<User> {
    if (getUserDto.username) {
      return await this.userService.updateUser(getUserDto);
    }

    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Este usuário não existe.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Delete()
  async deleteUser(
    @Query('username', UserValidateParamsPipes) username: string,
  ): Promise<void> {
    await this.userService.deleteUser(username);
  }
}
