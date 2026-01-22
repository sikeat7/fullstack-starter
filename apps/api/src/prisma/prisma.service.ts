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
      // En dev, es común correr el monorepo sin Docker/DB levantada.
      // No queremos que el proceso muera: arrancamos igual y logueamos el warning.
      this.logger.warn(
        `No se pudo conectar a la DB en el arranque. La API iniciará igualmente, pero endpoints que requieran DB fallarán. Error: ${String(
          (err as any)?.message ?? err,
        )}`,
      )
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
