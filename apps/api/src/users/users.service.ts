import { Injectable } from '@nestjs/common'

import { CreateUser, UpdateUser } from '@repo/data'

@Injectable()
export class UsersService {
  create(user: CreateUser) {
    return `This action adds a new user ${user.email}`
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, user: UpdateUser) {
    return `This action updates a #${id} user ${user.email}`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
