import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceResponse } from 'src/libs/service-response';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import { User } from './entities/user.entity';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
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

    const passwordHash = await this.hashingService.getHash(
      createUserDto.password,
    );
    const newUserDto = { ...createUserDto, password: passwordHash };
    const userWithDto = this.userRepository.create(newUserDto);
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

    const isPasswordHashAndOldPasswordSame = await this.hashingService.compare(
      oldPassword,
      password,
    );

    if (!isPasswordHashAndOldPasswordSame) {
      serviceResponse.errorCode = HttpStatus.FORBIDDEN;
      return serviceResponse;
    }

    const newPasswordHash = await this.hashingService.getHash(newPassword);

    const userWithNewData = {
      ...existingUser,
      password: newPasswordHash,
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

  async isUserLoginExists(login: string) {
    const existingUser = await this.userRepository.findOne({
      where: {
        login,
      },
    });

    return !!existingUser;
  }

  async getValidUser({ login, password }: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        login,
      },
    });

    if (!existingUser) return null;

    const isPasswordValid = await this.hashingService.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) return null;

    return existingUser;
  }
}
