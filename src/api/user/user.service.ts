import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceResponse } from 'src/libs/service-response';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async readAll() {
    const serviceResponse = new ServiceResponse<User[]>();
    const users = await this.userRepository.find();

    serviceResponse.data = users;
    return serviceResponse;
  }

  async readOne(id: string) {
    const serviceResponse = new ServiceResponse<User>();

    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingUser) {
      serviceResponse.errorCode = HttpStatus.NOT_FOUND;
      return serviceResponse;
    }

    serviceResponse.data = existingUser;

    return serviceResponse;
  }

  async create(createUserDto: CreateUserDto) {
    const serviceResponse = new ServiceResponse<User>();
    const userWithDto = this.userRepository.create(createUserDto);
    userWithDto.version = 1;

    const newUser = await this.userRepository.save(userWithDto);

    serviceResponse.data = newUser;

    return serviceResponse;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const serviceResponse = new ServiceResponse<User>();

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

    const updatedUser = this.userRepository.create(userWithNewData);
    const user = await this.userRepository.save(updatedUser);

    serviceResponse.data = user;

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
