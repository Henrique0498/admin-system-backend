import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  PipeTransform,
} from '@nestjs/common';

export class UserValidateParamsPipes implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `O parâmetro ${metadata.type} deve ser informado.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
