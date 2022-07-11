import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('api/v1/authentication')
export class AuthenticationController {
  @Post()
  authenticateUser(@Body() authenticateDto: AuthenticateDto) {
    if (!authenticateDto.username || !authenticateDto.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuário e senha precisa ser informado.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      const token = sign({}, '3877d991-142e-44b2-9b95-d05e2120d0c9', {
        subject: authenticateDto.username,
        expiresIn: '20s',
      });

      return {
        token: `Bearer ${token}`,
      };
    }
  }
}
