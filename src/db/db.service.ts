import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from 'src/api/user/dto';
import { User } from 'src/api/user/entities/user.entity';
import { getDate } from 'src/utils/date';
import { generateId } from 'src/utils/id';
import { getUserToResponse } from 'src/utils/user';

const data = {
  users: [
    {
      id: '30397502-11fc-474e-b9be-f408b9c59f3d',
      login: 'login',
      password: 'password',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

@Injectable()
export class DbService {
  constructor() {
    this.users = data.users;
  }

  private users: User[];

  userGetAll() {
    return this.users.map(getUserToResponse);
  }

  userGetOne(id: string) {
    const existingUser = this.users.find((user) => user.id === id);

    if (!existingUser)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    return getUserToResponse(existingUser);
  }

  userCreate(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: generateId(),
      version: 1,
      createdAt: getDate(),
      updatedAt: getDate(),
      ...createUserDto,
    };

    this.users.push(newUser);

    return getUserToResponse(newUser);
  }

  userUpdate(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1)
      return {
        error: HttpStatus.NOT_FOUND,
      };

    const user = { ...this.users[userIndex] };
    const { password, version } = user;
    const { oldPassword, newPassword } = updatePasswordDto;

    if (password !== oldPassword)
      return {
        error: HttpStatus.FORBIDDEN,
      };

    const userWithNewData = {
      ...user,
      password: newPassword,
      version: version + 1,
      updatedAt: getDate(),
    };

    this.users[userIndex] = userWithNewData;

    return getUserToResponse(userWithNewData);
  }

  userDelete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return {
        error: HttpStatus.NOT_FOUND,
      };
    }

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}
