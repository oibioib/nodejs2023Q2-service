import { Injectable } from '@nestjs/common';

import { DbService } from 'src/db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  readAll() {
    return this.db.userGetAll();
  }

  readOne(id: string) {
    return this.db.userGetOne(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.db.userCreate(createUserDto);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.db.userUpdate(id, updatePasswordDto);
  }

  delete(id: string) {
    return this.db.userDelete(id);
  }
}
