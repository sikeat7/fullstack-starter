# 🚀 Fullstack TypeScript Monorepo Starter

A production-ready fullstack TypeScript monorepo template with **Next.js 15**, **NestJS**, **Prisma**, **PostgreSQL**, and **Turborepo**.

Perfect for building modern SaaS applications, internal tools, or any fullstack TypeScript project.

---

## ✨ Features

### 🎯 **Monorepo Architecture**
- 📦 **Turborepo** - Fast build system with smart caching
- 🔗 **pnpm workspaces** - Efficient dependency management
- 🔄 **Shared packages** - Reusable code across applications
- 🎨 **Consistent tooling** - Unified ESLint, Prettier, and TypeScript configs

### 🎨 **Frontend (Client)**
- ⚡ **Next.js 15** with App Router and React Server Components
- 🎨 **Shadcn/ui** - Beautiful, accessible component library
- 🌈 **Tailwind CSS v4** - Modern utility-first styling
- 🚀 **Turbopack** - Next-generation bundler

### 🔧 **Backend (API)**
- 🏗️ **NestJS** - Scalable and maintainable backend framework
- 🗄️ **Prisma ORM** - Type-safe database access
- ✅ **Zod validation** - Runtime type checking
- 📖 **Swagger UI** - Auto-generated API documentation
- 🐳 **Docker Compose** - PostgreSQL + Redis setup

### 🛠️ **Developer Experience**
- 🎯 **TypeScript** - Full type safety across the stack
- 🔍 **ESLint + Prettier** - Code quality and formatting
- 🪝 **Husky + Commitlint** - Git hooks and conventional commits
- 🧪 **Jest** - Testing framework ready to use

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18 or higher
- **pnpm** 9.x (install with `npm install -g pnpm`)
- **Docker** and **Docker Compose** (for database)

---

## 🚀 Quick Start

### 1️⃣ Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/fullstack-starter.git
cd fullstack-starter

# Install dependencies
pnpm install
```

### 2️⃣ Environment Setup

```bash
# Copy environment files
cp apps/api/env.development.example apps/api/.env
cp apps/api/env.development.example apps/api/.env.development
```

### 3️⃣ Start Database

```bash
# Start PostgreSQL and Redis with Docker
pnpm db:up

# Verify containers are running
docker ps
```

### 4️⃣ Run Database Migrations

```bash
# Generate Prisma Client
pnpm --filter api run prisma:generate

# Run migrations
pnpm --filter api run prisma:migrate

# Seed database (optional - creates demo users)
pnpm --filter api run prisma:seed
```

### 5️⃣ Start Development Servers

```bash
# Start both API and Client
pnpm dev

# Or start them individually:
pnpm dev:api     # API at http://localhost:3000
pnpm dev:client  # Client at http://localhost:3001
```

🎉 **That's it!** Your fullstack app is now running.

- 🌐 **Frontend**: [http://localhost:3001](http://localhost:3001)
- 🔌 **API**: [http://localhost:3000](http://localhost:3000)
- 📖 **API Docs**: [http://localhost:3000/api](http://localhost:3000/api)
- 🗄️ **Prisma Studio**: Run `pnpm db:studio` then visit [http://localhost:5556](http://localhost:5556)

---

## 📁 Project Structure

```
fullstack-starter/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── prisma/             # Database schema and migrations
│   │   ├── src/
│   │   │   ├── users/          # Example users module
│   │   │   ├── prisma/         # Prisma service
│   │   │   └── main.ts         # Entry point
│   │   └── docker-compose.yml  # PostgreSQL + Redis
│   │
│   └── client/                 # Next.js frontend
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   ├── components/ui/  # Shadcn/ui components
│       │   └── lib/            # Utilities
│       └── components.json     # Shadcn/ui config
│
├── packages/
│   ├── config/                 # Environment validation
│   ├── core/                   # Shared constants
│   ├── data/                   # Zod schemas and DTOs
│   └── ui/                     # Shared React components
│
├── tooling/
│   ├── eslint/                 # ESLint configurations
│   ├── jest/                   # Jest configurations
│   ├── prettier/               # Prettier config
│   ├── tailwind/               # Tailwind config
│   └── typescript/             # TypeScript configs
│
├── docs/
│   └── ARCHITECTURE.md         # Detailed architecture docs
│
├── package.json                # Root package
├── pnpm-workspace.yaml         # Workspace configuration
└── turbo.json                  # Turborepo configuration
```

---

## 📚 Available Scripts

### 🏃 Development

```bash
pnpm dev              # Start all apps in parallel
pnpm dev:api          # Start only API
pnpm dev:client       # Start only Client
```

### 🏗️ Build

```bash
pnpm build            # Build all apps
pnpm build:api        # Build only API
pnpm build:client     # Build only Client
```

### 🗄️ Database

```bash
pnpm db:up            # Start PostgreSQL and Redis
pnpm db:down          # Stop containers
pnpm db:studio        # Open Prisma Studio
```

**Within API directory:**
```bash
pnpm --filter api run prisma:generate   # Generate Prisma Client
pnpm --filter api run prisma:migrate    # Run migrations
pnpm --filter api run prisma:push       # Push schema changes
pnpm --filter api run prisma:studio     # Open Prisma Studio
pnpm --filter api run prisma:seed       # Seed database
pnpm --filter api run prisma:reset      # Reset database
```

### 🧹 Code Quality

```bash
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code with Prettier
```

### 🧪 Testing

```bash
pnpm test             # Run all tests
pnpm test:e2e         # Run E2E tests
```

### 🧼 Clean

```bash
pnpm clean            # Remove build artifacts and node_modules
```

---

## 🎓 Stack Documentation

### Core Technologies

- **[Turborepo](https://turbo.build/repo/docs)** - Monorepo orchestration
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

### Frontend

- **[Next.js 15](https://nextjs.org/docs)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[Shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS

### Backend

- **[NestJS](https://docs.nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/docs)** - Next-generation ORM
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Redis](https://redis.io/)** - In-memory data store

---

## 🔑 Key Concepts

### Shared Packages

This monorepo uses shared packages to avoid code duplication:

#### `@repo/data` - Shared Validation Schemas

**Single source of truth for data validation:**

```typescript
// Define once
import { createUserSchema } from '@repo/data';

// Use in API (NestJS)
@UsePipes(ZodValidationPipe)
@Post()
create(@Body(new ZodValidationPipe(createUserSchema)) dto: CreateUserDto) {
  return this.usersService.create(dto);
}

// Use in Client (Next.js)
const result = createUserSchema.safeParse(formData);
```

#### `@repo/core` - Shared Constants

```typescript
import { UserRole } from '@repo/core';

// Same enum in API and Client
const role: UserRole = UserRole.ADMIN;
```

#### `@repo/config` - Environment Validation

```typescript
import { config } from '@repo/config';

// Type-safe, validated environment variables
console.log(config.DATABASE_URL);
```

### Prisma Database Setup

The starter includes a basic `User` model with:
- Authentication fields (email, password)
- User roles (ADMIN, USER)
- Soft delete support (`deletedAt`)
- Audit timestamps (`createdAt`, `updatedAt`)

**Extend it for your needs:**

```prisma
// apps/api/prisma/schema.prisma

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🎨 Adding UI Components

This starter uses **Shadcn/ui** for beautiful, accessible components.

```bash
# Add components from Shadcn/ui
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Components are installed directly in your project (not via npm), giving you full control.

---

## 🐳 Docker Configuration

The project includes Docker Compose for local development:

**Services:**
- **PostgreSQL 15** - Main database (port 5432)
- **Redis 7** - Cache and sessions (port 6379)

**Manage containers:**

```bash
pnpm db:up      # Start services
pnpm db:down    # Stop services
pnpm db:logs    # View logs
pnpm db:reset   # Reset database with fresh data
```

---

## 🚢 Deployment

### Deploy API (NestJS)

```bash
# Build for production
pnpm build:api

# Start production server
pnpm --filter api run start:prod
```

**Recommended platforms:**
- Railway
- Render
- Fly.io
- AWS (ECS, Lambda)
- Google Cloud Run

### Deploy Client (Next.js)

```bash
# Build for production
pnpm build:client
```

**Recommended platforms:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- AWS Amplify

### Database

**Production databases:**
- Neon (recommended for PostgreSQL)
- Supabase
- PlanetScale
- AWS RDS

Don't forget to:
1. Set production environment variables
2. Run migrations: `pnpm --filter api run prisma:migrate`
3. Generate Prisma Client in production build

---

## 🔐 Environment Variables

### API (.env)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Application
NODE_ENV="development"
PORT=3000
API_PREFIX="api/v1"

# Security
JWT_SECRET="your-super-secret-key-min-32-characters"
JWT_EXPIRES_IN="7d"
BCRYPT_ROUNDS=12

# CORS
CORS_ORIGIN="http://localhost:3001"
CLIENT_URL="http://localhost:3001"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
REDIS_PORT=6379
```

### Client (.env.local)

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Commit Convention:** This project uses [Conventional Commits](https://www.conventionalcommits.org/).

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

---

## 📖 Learn More

Check out the detailed [Architecture Documentation](./docs/ARCHITECTURE.md) to understand:
- How the monorepo is structured
- Data flow between applications
- Package dependencies
- Best practices

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments

This starter was built with amazing open-source technologies:

- [Vercel](https://vercel.com/) - Next.js creators
- [Turborepo Team](https://turbo.build/) - Monorepo tooling
- [Prisma Team](https://www.prisma.io/) - Database ORM
- [NestJS Team](https://nestjs.com/) - Backend framework
- [Shadcn](https://twitter.com/shadcn) - Component library

---

## 💬 Questions or Issues?

- 📖 Read the [Architecture Docs](./docs/ARCHITECTURE.md)
- 🐛 [Open an issue](https://github.com/yourusername/fullstack-starter/issues)
- 💬 Start a discussion

---

**Made with ❤️ for the TypeScript community**

⭐ Star this repo if you find it helpful!
