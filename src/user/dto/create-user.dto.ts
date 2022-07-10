export class CreateUserDto {
  readonly email: string;
  readonly username: string;
  readonly userForeignKey: string;
  readonly userPhoto: string;
  readonly cardPhoto: string;
  readonly name: string;
  readonly gender: string;
  readonly numberPhone: string;
}
