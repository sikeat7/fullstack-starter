import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { I18n, I18nContext } from 'nestjs-i18n';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(@I18n() i18n: I18nContext): string {
    return i18n.t('common.welcome');
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  }

  @Get('health/db')
  async getDbHealth(): Promise<{
    status: 'ok' | 'down';
    timestamp: string;
    error?: string;
  }> {
    try {
      // Un ping simple y rápido a la DB
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', timestamp: new Date().toISOString() };
    } catch (err) {
      return {
        status: 'down',
        timestamp: new Date().toISOString(),
        error: String((err as any)?.message ?? err),
      };
    }
  }
}
