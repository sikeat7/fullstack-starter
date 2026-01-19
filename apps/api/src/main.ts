import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from './common/filters/http-exception.filter'
// import { config } from '@repo/config'; // Descomentar cuando se compile @repo/config

async function bootstrap() {
  // ========================================
  // Validación de Variables de Entorno
  // ========================================
  // El config se valida automáticamente al importarse
  // Si hay errores, el proceso terminará antes de crear la app

  const app = await NestFactory.create(AppModule)

  // ========================================
  // Filtro Global de Excepciones
  // ========================================
  app.useGlobalFilters(new GlobalExceptionFilter())

  // ========================================
  // CORS
  // ========================================
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })

  // ========================================
  // Prefix Global
  // ========================================
  const apiPrefix = process.env.API_PREFIX || 'api/v1'
  app.setGlobalPrefix(apiPrefix)

  // ========================================
  // Swagger/OpenAPI Documentation
  // ========================================
  const swaggerConfig = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'B2B API')
    .setDescription(
      process.env.SWAGGER_DESCRIPTION || 'API for B2B platform for merchants and suppliers',
    )
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .addBearerAuth()
    .addTag('users', 'User management')
    .addTag('auth', 'Authentication (future)')
    .addTag('businesses', 'Business management (future)')
    .addTag('products', 'Product catalog (future)')
    .addTag('suppliers', 'Supplier management (future)')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api/docs', app, document)

  // ========================================
  // Start Server
  // ========================================
  const port = process.env.PORT || 3000
  await app.listen(port)

  console.log('')
  console.log('🚀 ========================================')
  console.log(`   B2B API iniciada correctamente`)
  console.log('   ========================================')
  console.log(`   📍 API: http://localhost:${port}/${apiPrefix}`)
  console.log(`   📚 Docs: http://localhost:${port}/api/docs`)
  console.log(`   🌍 Entorno: ${process.env.NODE_ENV || 'development'}`)
  console.log('   ========================================')
  console.log('')
}

void bootstrap()
