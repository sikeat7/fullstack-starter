/**
 * @fileoverview Environment variables validation with Zod
 * @purpose Validates and types all required environment variables (DB, JWT, CORS, etc.)
 *          Runs at application startup to fail fast if any config is missing.
 */

import { z } from 'zod';

/**
 * Validation schema for environment variables
 * This schema ensures all required variables exist and have the correct format
 */
const envSchema = z.object({
  // ===========================================
  // Environment
  // ===========================================
  NODE_ENV: z
    .enum(['development', 'staging', 'production', 'test'])
    .default('development'),

  // ===========================================
  // Base de Datos
  // ===========================================
  DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida'),

  // Estas son opcionales porque se usan solo en docker-compose
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  DB_PORT: z.coerce.number().optional(),

  // ===========================================
  // Aplicación
  // ===========================================
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  APP_PORT: z.coerce.number().min(1).max(65535).default(3000),
  API_PREFIX: z.string().default('api/v1'),

  // ===========================================
  // Redis (Opcional)
  // ===========================================
  REDIS_URL: z.string().url().optional(),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_PASSWORD: z.string().optional(),

  // ===========================================
  // JWT & Security
  // ===========================================
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET debe tener al menos 32 caracteres')
    .refine(
      (val: string) => {
        // En producción, no permitir valores por defecto inseguros
        const nodeEnv = process.env.NODE_ENV;
        if (nodeEnv === 'production') {
          return !val.includes('dev-secret') && !val.includes('change-in-production');
        }
        return true;
      },
      {
        message: 'JWT_SECRET en producción debe ser un valor seguro',
      },
    ),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(15).default(12),

  // ===========================================
  // Logging
  // ===========================================
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'debug', 'verbose'])
    .default('info'),

  // ===========================================
  // CORS
  // ===========================================
  CORS_ORIGIN: z.string().url().default('http://localhost:3001'),
  CLIENT_URL: z.string().url().default('http://localhost:3001'),

  // ===========================================
  // Rate Limiting
  // ===========================================
  RATE_LIMIT_TTL: z.coerce.number().default(60),
  RATE_LIMIT_LIMIT: z.coerce.number().default(100),

  // ===========================================
  // Swagger
  // ===========================================
  SWAGGER_TITLE: z.string().default('B2B API'),
  SWAGGER_DESCRIPTION: z
    .string()
    .default('Sistema SaaS B2B para comerciantes y proveedores'),
  SWAGGER_VERSION: z.string().default('1.0.0'),
});

/**
 * Tipo inferido del schema
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Valida las variables de entorno al iniciar la aplicación
 * Si hay errores, imprime los detalles y termina el proceso
 */
export const validateEnv = (): EnvConfig => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Variables de entorno inválidas:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  // En desarrollo, mostrar las variables cargadas (sin secretos)
  if (result.data.NODE_ENV === 'development') {
    console.log('✅ Variables de entorno validadas correctamente');
    console.log(`   NODE_ENV: ${result.data.NODE_ENV}`);
    console.log(`   PORT: ${result.data.PORT}`);
    console.log(`   DATABASE_URL: ${result.data.DATABASE_URL.replace(/:[^:@]+@/, ':****@')}`);
  }

  return result.data;
};

/**
 * Validated configuration ready to use
 */
export const config = validateEnv();
