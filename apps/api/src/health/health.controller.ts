import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaHealthIndicator } from './prisma.health';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Basic health check' })
  check() {
    return this.health.check([]);
  }

  @Get('db')
  @HealthCheck()
  @ApiOperation({ summary: 'Database health check' })
  checkDb() {
    return this.health.check([() => this.prismaHealth.isHealthy('database')]);
  }
}
