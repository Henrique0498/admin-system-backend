import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('api/v1/authentication')
export class AuthenticationController {
  constructor(private userService: UserService) {}

  @Post()
  async authenticateUser(@Body() authenticateDto: AuthenticateDto) {
    if (!authenticateDto.username || !authenticateDto.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuário e senha precisa ser informado.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      const userRequest = await this.userService.getUser(
        authenticateDto.username,
      );
      const passwordIsValid = await compare(
        authenticateDto.password,
        userRequest.password,
      );

      if (!passwordIsValid) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'A senha informada está incorreta.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const token = sign({}, '3877d991-142e-44b2-9b95-d05e2120d0c9', {
        subject: authenticateDto.username,
        expiresIn: '20s',
      });

      return {
        username: userRequest.username,
        name: userRequest.name,
        photo: userRequest.userPhoto,
        cardPhoto: userRequest.cardPhoto,
        token: `Bearer ${token}`,
      };
    }
  }
}
