-- ===========================================
-- Database initialization script
-- B2B API - NestJS + Prisma
-- ===========================================

-- Create required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Performance-related settings
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 1000;

-- Set timezone
SET timezone = 'America/Argentina/Buenos_Aires';
