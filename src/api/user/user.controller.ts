import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Put,
} from '@nestjs/common';

import {
  SwaggerUserEndpoint,
  SwaggerGetAllUsers,
  SwaggerGetUser,
  SwaggerPostUser,
  SwaggerPutUser,
  SwaggerDeleteUser,
} from './swagger/user.swagger';

import { UUIDParam } from 'src/utils/id';
import { UserService } from './user.service';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from './user.exceptions';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Controller('user')
@SwaggerUserEndpoint()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerGetAllUsers()
  readAll() {
    const { data } = this.userService.readAll();
    return data;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUser()
  readOne(@UUIDParam('id') id: string) {
    const { data, errorCode } = this.userService.readOne(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostUser()
  createOne(@Body() createUserDto: CreateUserDto) {
    const { data } = this.userService.create(createUserDto);
    return data;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutUser()
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { data, errorCode } = this.userService.update(id, updatePasswordDto);

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();
    if (errorCode === HttpStatus.FORBIDDEN)
      throw new InvalidPasswordException();

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteUser()
  deleteOne(@UUIDParam('id') id: string) {
    const { errorCode } = this.userService.delete(id);

    if (errorCode === HttpStatus.NOT_FOUND) throw new UserNotFoundException();
  }
}
