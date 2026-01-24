import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connection established');
    } catch (err) {
      // In dev, it's common to run the monorepo without Docker/DB running.
      // We don't want the process to crash: we still boot and log a warning.
      this.logger.warn(
        `Could not connect to the DB at startup. The API will still start, but DB-dependent endpoints will fail. Error: ${String(
          (err as Error)?.message ?? err,
        )}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Perform a soft delete by setting deletedAt
   */
  async softDelete<T extends { deletedAt?: Date | null }>(
    model: string,
    where: Record<string, unknown>,
  ): Promise<T> {
    return (this as any)[model].update({
      where,
      data: { deletedAt: new Date() },
    });
  }

  /**
   * Restore a soft-deleted record
   */
  async restore<T extends { deletedAt?: Date | null }>(
    model: string,
    where: Record<string, unknown>,
  ): Promise<T> {
    return (this as any)[model].update({
      where,
      data: { deletedAt: null },
    });
  }
}
