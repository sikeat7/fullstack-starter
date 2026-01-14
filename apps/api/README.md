# 🚀 B2B API - Sistema SaaS B2B

Sistema SaaS B2B para comerciantes (bares, restaurantes, almacenes) y proveedores (distribuidores de bebidas, alimentos, limpieza, etc.). El MVP funciona como un **ERP liviano** con el objetivo de digitalizar operaciones manuales como pedidos, pagos, remitos y facturación.

## 🎯 Características

- **ERP Liviano**: Gestión de pedidos, pagos, remitos y facturación
- **Marketplace Inteligente**: Comparador de precios y órdenes de compra automáticas (futuro)
- **Arquitectura Modular**: NestJS con estructura modular escalable
- **Base de Datos Robusta**: PostgreSQL con Prisma ORM
- **Seguridad Avanzada**: JWT, bcrypt, validaciones robustas
- **Docker Optimizado**: Multi-stage builds y configuración de producción

## 🏗️ Stack Tecnológico

- **Backend**: NestJS, TypeScript, Prisma ORM
- **Base de Datos**: PostgreSQL 15
- **Cache**: Redis 7
- **Autenticación**: JWT, bcryptjs
- **Validación**: class-validator, zod
- **Documentación**: Swagger/OpenAPI
- **Containerización**: Docker, Docker Compose
- **Gestor de Paquetes**: pnpm

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker Desktop
- Node.js 20+
- pnpm

### Configuración Inicial

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd b2b-api
```

2. **Configurar variables de entorno**

```bash
cp env.example .env
# Editar .env con tus configuraciones
```

3. **Iniciar servicios de desarrollo**

```bash
./scripts/docker-dev.sh start
```

4. **Verificar que todo funcione**

```bash
./scripts/docker-dev.sh health
```

### Endpoints Disponibles

- **Health Check**: `GET /health`
- **API Base**: `GET /`
- **Swagger Docs**: `GET /api` (cuando esté configurado)

## 🛠️ Desarrollo

### Scripts de Utilidad

```bash
# Iniciar servicios
./scripts/docker-dev.sh start

# Ver logs
./scripts/docker-dev.sh logs

# Abrir shell en contenedor
./scripts/docker-dev.sh shell

# Ejecutar tests
./scripts/docker-dev.sh test

# Verificar health checks
./scripts/docker-dev.sh health

# Detener servicios
./scripts/docker-dev.sh stop

# Limpiar todo
./scripts/docker-dev.sh clean
```

### Comandos Docker Directos

```bash
# Desarrollo
docker-compose up app-dev

# Producción
docker-compose -f docker-compose.prod.yml up -d

# Rebuild
docker-compose build

# Logs específicos
docker-compose logs -f app-dev
docker-compose logs -f db
docker-compose logs -f redis
```

### Estructura del Proyecto

```
b2b-api/
├── src/
│   ├── app.controller.ts      # Controlador principal
│   ├── app.service.ts         # Servicio principal
│   ├── app.module.ts          # Módulo principal
│   └── main.ts               # Punto de entrada
├── test/                     # Tests
├── scripts/                  # Scripts de utilidad
├── Dockerfile               # Docker para producción
├── Dockerfile.dev           # Docker para desarrollo
├── docker-compose.yml       # Configuración desarrollo
├── docker-compose.prod.yml  # Configuración producción
├── env.example              # Variables de entorno ejemplo
└── README.md               # Documentación
```

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env` y configura:

```bash
# Base de Datos
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=b2b_db

# Aplicación
NODE_ENV=development
PORT=3000

# Seguridad
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12

# Redis
REDIS_PASSWORD=redis123
```

### Servicios Docker

- **app-dev**: Aplicación NestJS en modo desarrollo
- **app-prod**: Aplicación NestJS en modo producción
- **db**: PostgreSQL 15
- **redis**: Redis 7 para cache

## 🧪 Testing

```bash
# Tests unitarios
./scripts/docker-dev.sh test

# Tests E2E
docker-compose exec app-dev pnpm run test:e2e

# Cobertura
docker-compose exec app-dev pnpm run test:cov
```

## 📊 Monitoreo

### Health Checks

Todos los servicios incluyen health checks:

- **API**: `GET /health`
- **PostgreSQL**: `pg_isready`
- **Redis**: `redis-cli ping`

### Logs

```bash
# Logs de aplicación
./scripts/docker-dev.sh logs

# Logs específicos
./scripts/docker-dev.sh logs-db
./scripts/docker-dev.sh logs-redis
```

## 🚀 Producción

### Configuración de Producción

1. **Configurar variables de producción**

```bash
export POSTGRES_USER=prod_user
export POSTGRES_PASSWORD=secure_password
export POSTGRES_DB=b2b_prod
export JWT_SECRET=production-secret-key
```

2. **Ejecutar en producción**

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Optimizaciones de Producción

- **Multi-stage builds**: Imágenes optimizadas
- **Usuario no-root**: Seguridad mejorada
- **Health checks**: Monitoreo automático
- **Volúmenes persistentes**: Datos persistentes
- **Networks aisladas**: Seguridad de red

## 🔐 Seguridad

### Mejores Prácticas Implementadas

- ✅ Usuario no-root en contenedores
- ✅ Variables de entorno para credenciales
- ✅ Health checks para todos los servicios
- ✅ Validación de entrada con class-validator
- ✅ Hashing de passwords con bcrypt
- ✅ JWT para autenticación
- ✅ CORS configurado
- ✅ Rate limiting preparado

## 📈 Arquitectura

### Patrones de Diseño

- **Modular**: Estructura de módulos NestJS
- **Inyección de Dependencias**: Services inyectados
- **Repository Pattern**: Prisma como ORM
- **DTO Pattern**: Validación de entrada
- **Exception Filter**: Manejo centralizado de errores

### Base de Datos

- **PostgreSQL**: Base de datos principal
- **Prisma ORM**: Type-safe database access
- **Migrations**: Control de versiones de schema
- **Soft Delete**: Eliminación lógica
- **Indexes**: Optimización de queries

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

- **Issues**: Reporta bugs en GitHub Issues
- **Documentación**: Swagger docs en `/api`
- **Logs**: Usa `./scripts/docker-dev.sh logs`
- **Health**: Verifica con `./scripts/docker-dev.sh health`

---

**Desarrollado con ❤️ para el ecosistema B2B**
