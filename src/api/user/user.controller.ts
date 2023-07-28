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

import { UUIDParam } from 'src/utils/id';
import { UserService } from './user.service';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from './user.exceptions';
import { CreateUserDto, UpdatePasswordDto } from './dto';
import {
  SwaggerUserEndpoint,
  SwaggerGetAllUsers,
  SwaggerGetUser,
  SwaggerPostUser,
  SwaggerPutUser,
  SwaggerDeleteUser,
} from './swagger/user.swagger';

@SwaggerUserEndpoint()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @SwaggerGetAllUsers()
  readAll() {
    return this.userService.readAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUser()
  readOne(@UUIDParam('id') id: string) {
    const data = this.userService.readOne(id);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new UserNotFoundException();
    }

    return data;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostUser()
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @SwaggerPutUser()
  updateOne(
    @UUIDParam('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const data = this.userService.update(id, updatePasswordDto);

    if ('error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new UserNotFoundException();
      if (data.error === HttpStatus.FORBIDDEN)
        throw new InvalidPasswordException();
    }

    return data;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteUser()
  deleteOne(@UUIDParam('id') id: string) {
    const data = this.userService.delete(id);

    if (data && 'error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new UserNotFoundException();
    }
  }
}
