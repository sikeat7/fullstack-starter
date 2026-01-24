import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUser, UpdateUser } from '@repo/data';

import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';
import { ApiErrorDto } from '../common/dto/api-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ApiErrorDto,
  })
  create(@Body() user: CreateUser) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'List of users',
    type: [UserResponseDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'clnjfg5q4000108l4g8h0h8j0' })
  @ApiOkResponse({
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ApiErrorDto,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'clnjfg5q4000108l4g8h0h8j0' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ApiErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ApiErrorDto,
  })
  update(@Param('id') id: string, @Body() user: UpdateUser) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'clnjfg5q4000108l4g8h0h8j0' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ApiErrorDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
