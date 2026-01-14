import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUser, UpdateUser } from '@repo/data'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUser) {
    return this.usersService.create(user)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUser) {
    return this.usersService.update(+id, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
