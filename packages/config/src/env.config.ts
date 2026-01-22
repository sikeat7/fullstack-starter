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
  // Database
  // ===========================================
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  // Optional: used only by docker-compose
  POSTGRES_USER: z.string().optional(),
  POSTGRES_PASSWORD: z.string().optional(),
  POSTGRES_DB: z.string().optional(),
  DB_PORT: z.coerce.number().optional(),

  // ===========================================
  // Application
  // ===========================================
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  APP_PORT: z.coerce.number().min(1).max(65535).default(3000),
  API_PREFIX: z.string().default('api/v1'),

  // ===========================================
  // Redis (optional)
  // ===========================================
  REDIS_URL: z.string().url().optional(),
  REDIS_PORT: z.coerce.number().optional().default(6379),
  REDIS_PASSWORD: z.string().optional(),

  // ===========================================
  // JWT & Security
  // ===========================================
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters')
    .refine(
      (val: string) => {
        // In production, disallow insecure default values
        const nodeEnv = process.env.NODE_ENV;
        if (nodeEnv === 'production') {
          return !val.includes('dev-secret') && !val.includes('change-in-production');
        }
        return true;
      },
      {
        message: 'In production, JWT_SECRET must be a secure value',
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
    .default('B2B SaaS system for merchants and suppliers'),
  SWAGGER_VERSION: z.string().default('1.0.0'),
});

/**
 * Inferred type from the schema
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * Validates environment variables at application startup.
 * If validation fails, prints details and exits the process.
 */
export const validateEnv = (): EnvConfig => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  // In development, print loaded variables (without secrets)
  if (result.data.NODE_ENV === 'development') {
    console.log('✅ Environment variables validated successfully');
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
