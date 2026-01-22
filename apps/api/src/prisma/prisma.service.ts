// src/prisma/prisma.service.ts
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit() {
    try {
      await this.$connect()
    } catch (err) {
      // In dev, it's common to run the monorepo without Docker/DB running.
      // We don't want the process to crash: we still boot and log a warning.
      this.logger.warn(
        `Could not connect to the DB at startup. The API will still start, but DB-dependent endpoints will fail. Error: ${String(
          (err as any)?.message ?? err,
        )}`,
      )
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
