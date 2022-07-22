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
import { hash } from 'bcryptjs';
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
    const getUsername = await this.userService.getUser(createUserDto.username);

    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'As senhas não se coincidem.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (getUsername) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Já existe um usuário com esse username.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const password = await hash(createUserDto.password, 8);

    await this.userService.createUser({ ...createUserDto, password });
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
