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

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly passwordConfirm: string;

  @IsNotEmpty()
  readonly birthDate: Date;

  readonly userPhoto: string;
  readonly cardPhoto: string;
}
