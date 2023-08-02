import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DBResponse } from 'src/db/response/db-response';
import { UserWithoutPassword } from './entities/user-without-password.entity copy';
import { getUserToResponse } from 'src/utils/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async readAll() {
    const dbResponse = new DBResponse<UserWithoutPassword[]>();
    const users = await this.userRepository.find();

    dbResponse.data = users.map(getUserToResponse);
    return dbResponse;
  }

  async readOne(id: string) {
    const dbResponse = new DBResponse<UserWithoutPassword>();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    dbResponse.data = getUserToResponse(existingUser);

    return dbResponse;
  }

  async create(createUserDto: CreateUserDto) {
    const dbResponse = new DBResponse<UserWithoutPassword>();
    const userWithDto = this.userRepository.create(createUserDto);
    userWithDto.version = 1;

    const newUser = await this.userRepository.save(userWithDto);

    dbResponse.data = getUserToResponse(newUser);

    return dbResponse;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const dbResponse = new DBResponse<UserWithoutPassword>();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
      return dbResponse;
    }

    const { password, version } = existingUser;
    const { oldPassword, newPassword } = updatePasswordDto;

    if (password !== oldPassword) {
      dbResponse.errorCode = HttpStatus.FORBIDDEN;
      return dbResponse;
    }

    const userWithNewData = {
      ...existingUser,
      password: newPassword,
      version: version + 1,
    };

    const user = await this.userRepository.save(userWithNewData);
    dbResponse.data = getUserToResponse(user);

    return dbResponse;
  }

  async delete(id: string) {
    const dbResponse = new DBResponse();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      dbResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingUser) {
      await this.userRepository.remove(existingUser);
    }

    return dbResponse;
  }
}
