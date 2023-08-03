import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import {
  SwaggerUserEndpoint,
  SwaggerGetAllUsers,
  SwaggerGetUser,
  SwaggerPostUser,
  SwaggerPutUser,
  SwaggerDeleteUser,
} from './swagger/user.swagger';

import { UUIDParam } from 'src/libs/id';
import { UserService } from './user.service';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from './user.exceptions';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@SwaggerUserEndpoint()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerGetAllUsers()
  async readAll() {
    const { data } = await this.userService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUser()
  async readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = await this.userService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostUser()
  async createOne(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.userService.create(createUserDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutUser()
  async updateOne(
    @UUIDParam('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { data, errorCode } = await this.userService.update(
      id,
      updatePasswordDto,
    );

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();
    if (errorCode === HttpStatus.FORBIDDEN)
      throw new InvalidPasswordException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteUser()
  async deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = await this.userService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();
  }
}
