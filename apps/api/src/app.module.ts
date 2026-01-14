import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { PrismaModule } from './prisma/prisma.module'
import { PrismaService } from './prisma/prisma.service'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
