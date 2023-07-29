import { HttpStatus } from '@nestjs/common';

export class DBResponse<T> {
  constructor() {
    this.data = undefined;
    this.errorCode = null;
  }

  data: T | undefined;
  errorCode: HttpStatus | null;
}
