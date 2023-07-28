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
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import { UUIDParam } from 'src/utils/id';
import { UserService } from './user.service';
import {
  InvalidPasswordException,
  UserNotFoundException,
} from './user.exceptions';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users.',
    description: 'Get all users.',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
  })
  readAll() {
    return this.userService.readAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get single user.',
    description: 'Get single user by ID (uuid).',
  })
  @ApiOkResponse({
    description: 'Successful operation.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
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
  @ApiOperation({
    summary: 'Creates a new user.',
    description: 'Creates a new user.',
  })
  @ApiCreatedResponse({
    description: 'The user has been created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description:
      'Bad request. Body does not contain required fields: [ ...fields ].',
  })
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Update user's password.",
    description: "Update user's password by ID (uuid).",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid).',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
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
  @ApiOperation({
    summary: 'Delete user.',
    description: 'Deletes user by ID (uuid).',
  })
  @ApiNoContentResponse({
    description: 'The user has been deleted.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid).',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  deleteOne(@UUIDParam('id') id: string) {
    const data = this.userService.delete(id);

    if (data && 'error' in data) {
      if (data.error === HttpStatus.NOT_FOUND)
        throw new UserNotFoundException();
    }
  }
}
