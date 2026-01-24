import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: NestConfigService) {}

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL', '');
  }

  get corsOrigin(): string {
    return this.configService.get<string>('CORS_ORIGIN', 'http://localhost:3001');
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX', 'api/v1');
  }

  get swagger(): {
    title: string;
    description: string;
    version: string;
  } {
    return {
      title: this.configService.get<string>('SWAGGER_TITLE', 'B2B API'),
      description: this.configService.get<string>(
        'SWAGGER_DESCRIPTION',
        'API for B2B platform for merchants and suppliers',
      ),
      version: this.configService.get<string>('SWAGGER_VERSION', '1.0.0'),
    };
  }
}
