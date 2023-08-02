import { HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdatePasswordDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ServiceResponse } from 'src/libs/service-response';
import { UserWithoutPassword } from './entities/user-without-password.entity copy';
import { getUserToResponse } from 'src/libs/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<UserWithoutPassword[]>();
    const users = await this.userRepository.find();

    serviceResponse.data = users.map(getUserToResponse);
    return serviceResponse;
  }

  async readOne(id: string) {
    const serviceResponse = new ServiceResponse<UserWithoutPassword>();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    serviceResponse.data = getUserToResponse(existingUser);

    return serviceResponse;
  }

  async create(createUserDto: CreateUserDto) {
    const serviceResponse = new ServiceResponse<UserWithoutPassword>();
    const userWithDto = this.userRepository.create(createUserDto);
    userWithDto.version = 1;

    const newUser = await this.userRepository.save(userWithDto);

    serviceResponse.data = getUserToResponse(newUser);

    return serviceResponse;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const serviceResponse = new ServiceResponse<UserWithoutPassword>();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    const { password, version } = existingUser;
    const { oldPassword, newPassword } = updatePasswordDto;

    if (password !== oldPassword) {
      serviceResponse.errorCode = HttpStatus.FORBIDDEN;
      return serviceResponse;
    }

    const userWithNewData = {
      ...existingUser,
      password: newPassword,
      version: version + 1,
    };

    const user = await this.userRepository.save(userWithNewData);
    serviceResponse.data = getUserToResponse(user);

    return serviceResponse;
  }

  async delete(id: string) {
    const serviceResponse = new ServiceResponse();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
    }

    if (existingUser) {
      await this.userRepository.remove(existingUser);
    }

    return serviceResponse;
  }
}
