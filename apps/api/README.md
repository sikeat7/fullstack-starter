# 🚀 B2B API - B2B SaaS System

B2B SaaS system for merchants (bars, restaurants, warehouses) and suppliers (beverage distributors, food, cleaning, etc.). The MVP works as a **lightweight ERP** with the goal of digitizing manual operations such as orders, payments, delivery notes and invoicing.

## 🎯 Features

- **Lightweight ERP**: Order management, payments, delivery notes and invoicing
- **Smart Marketplace**: Price comparison and automatic purchase orders (future)
- **Modular Architecture**: NestJS with scalable modular structure
- **Robust Database**: PostgreSQL with Prisma ORM
- **Advanced Security**: JWT, bcrypt, robust validations
- **Optimized Docker**: Multi-stage builds and production configuration

## 🏗️ Technology Stack

- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Authentication**: JWT, bcryptjs
- **Validation**: class-validator, zod
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker, Docker Compose
- **Package Manager**: pnpm

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Node.js 20+
- pnpm

### Initial Configuration

1. **Clone the repository**

```bash
git clone <repository-url>
cd b2b-api
```

2. **Configure environment variables**

```bash
cp env.example .env
# Edit .env with your configurations
```

3. **Start development services**

```bash
./scripts/docker-dev.sh start
```

4. **Verify everything works**

```bash
./scripts/docker-dev.sh health
```

### Available Endpoints

- **Health Check**: `GET /health`
- **API Base**: `GET /`
- **Swagger Docs**: `GET /api` (when configured)

## 🛠️ Development

### Utility Scripts

```bash
# Start services
./scripts/docker-dev.sh start

# View logs
./scripts/docker-dev.sh logs

# Open shell in container
./scripts/docker-dev.sh shell

# Run tests
./scripts/docker-dev.sh test

# Verify health checks
./scripts/docker-dev.sh health

# Stop services
./scripts/docker-dev.sh stop

# Clean everything
./scripts/docker-dev.sh clean
```

### Direct Docker Commands

```bash
# Development
docker-compose up app-dev

# Production
docker-compose -f docker-compose.prod.yml up -d

# Rebuild
docker-compose build

# Specific logs
docker-compose logs -f app-dev
docker-compose logs -f db
docker-compose logs -f redis
```

### Project Structure

```
b2b-api/
├── src/
│   ├── app.controller.ts      # Main controller
│   ├── app.service.ts         # Main service
│   ├── app.module.ts          # Main module
│   └── main.ts               # Entry point
├── test/                     # Tests
├── scripts/                  # Utility scripts
├── Dockerfile               # Docker for production
├── Dockerfile.dev           # Docker for development
├── docker-compose.yml       # Development configuration
├── docker-compose.prod.yml  # Production configuration
├── env.example              # Environment variables example
└── README.md               # Documentation
```

## 🔧 Configuration

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=b2b_db

# Application
NODE_ENV=development
PORT=3000

# Security
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12

# Redis
REDIS_PASSWORD=redis123
```

### Docker Services

- **app-dev**: NestJS application in development mode
- **app-prod**: NestJS application in production mode
- **db**: PostgreSQL 15
- **redis**: Redis 7 for cache

## 🧪 Testing

```bash
# Unit tests
./scripts/docker-dev.sh test

# E2E tests
docker-compose exec app-dev pnpm run test:e2e

# Coverage
docker-compose exec app-dev pnpm run test:cov
```

## 📊 Monitoring

### Health Checks

All services include health checks:

- **API**: `GET /health`
- **PostgreSQL**: `pg_isready`
- **Redis**: `redis-cli ping`

### Logs

```bash
# Application logs
./scripts/docker-dev.sh logs

# Specific logs
./scripts/docker-dev.sh logs-db
./scripts/docker-dev.sh logs-redis
```

## 🚀 Production

### Production Configuration

1. **Configure production variables**

```bash
export POSTGRES_USER=prod_user
export POSTGRES_PASSWORD=secure_password
export POSTGRES_DB=b2b_prod
export JWT_SECRET=production-secret-key
```

2. **Run in production**

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Production Optimizations

- **Multi-stage builds**: Optimized images
- **Non-root user**: Enhanced security
- **Health checks**: Automatic monitoring
- **Persistent volumes**: Persistent data
- **Isolated networks**: Network security

## 🔐 Security

### Implemented Best Practices

- ✅ Non-root user in containers
- ✅ Environment variables for credentials
- ✅ Health checks for all services
- ✅ Input validation with class-validator
- ✅ Password hashing with bcrypt
- ✅ JWT for authentication
- ✅ CORS configured
- ✅ Rate limiting prepared

## 📈 Architecture

### Design Patterns

- **Modular**: NestJS module structure
- **Dependency Injection**: Injected services
- **Repository Pattern**: Prisma as ORM
- **DTO Pattern**: Input validation
- **Exception Filter**: Centralized error handling

### Database

- **PostgreSQL**: Main database
- **Prisma ORM**: Type-safe database access
- **Migrations**: Schema version control
- **Soft Delete**: Logical deletion
- **Indexes**: Query optimization

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT License. See the `LICENSE` file for more details.

## 🆘 Support

- **Issues**: Report bugs in GitHub Issues
- **Documentation**: Swagger docs at `/api`
- **Logs**: Use `./scripts/docker-dev.sh logs`
- **Health**: Check with `./scripts/docker-dev.sh health`

---

**Developed with ❤️ for the B2B ecosystem**
