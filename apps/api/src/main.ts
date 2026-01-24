import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);

  // ========================================
  // Global Exception Filter
  // ========================================
  app.useGlobalFilters(new GlobalExceptionFilter());

  // ========================================
  // CORS
  // ========================================
  app.enableCors({
    origin: configService.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-correlation-id'],
  });

  // ========================================
  // Global Prefix
  // ========================================
  const apiPrefix = configService.apiPrefix;
  app.setGlobalPrefix(apiPrefix);

  // ========================================
  // Swagger/OpenAPI Documentation
  // ========================================
  const swagger = configService.swagger;
  const swaggerConfig = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addBearerAuth()
    .addTag('health', 'Health check endpoints')
    .addTag('users', 'User management')
    .addTag('auth', 'Authentication (future)')
    .addTag('businesses', 'Business management (future)')
    .addTag('products', 'Product catalog (future)')
    .addTag('suppliers', 'Supplier management (future)')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // ========================================
  // Start Server
  // ========================================
  const port = configService.port;
  await app.listen(port);

  console.log('');
  console.log('========================================');
  console.log('   B2B API started successfully');
  console.log('========================================');
  console.log(`   API: http://localhost:${port}/${apiPrefix}`);
  console.log(`   Docs: http://localhost:${port}/api/docs`);
  console.log(`   Health: http://localhost:${port}/${apiPrefix}/health`);
  console.log(`   Environment: ${configService.nodeEnv}`);
  console.log('========================================');
  console.log('');
}

void bootstrap();
