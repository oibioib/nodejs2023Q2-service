import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  _salt: number;

  constructor(private readonly configService: ConfigService) {
    this._salt = +this.configService.get('CRYPT_SALT');
  }

  async getHash(data: string) {
    const dataHash = await bcrypt.hash(data, 10);
    return dataHash;
  }

  async compare(data: string, hash: string) {
    const result = await bcrypt.compare(data, hash);
    return result;
  }
}
