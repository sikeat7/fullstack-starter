-- ===========================================
-- Script de Inicialización de Base de Datos
-- B2B API - NestJS + Prisma
-- ===========================================

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Crear índices y configuraciones de rendimiento
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET log_statement = 'all';
ALTER SYSTEM SET log_min_duration_statement = 1000;

-- Configurar timezone
SET timezone = 'America/Argentina/Buenos_Aires';
