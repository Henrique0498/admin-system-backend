import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  readonly name: string;

  readonly userForeignKey: string;
  readonly userPhoto: string;
  readonly cardPhoto: string;
  readonly numberPhone: string;
}
