import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform {
  transform(id: string) {
    if (!validate(id)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }
    return id;
  }
}
