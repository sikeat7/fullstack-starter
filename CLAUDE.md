# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference

### Ports
| Service | Port |
|---------|------|
| API | 3000 |
| Client | 3001 |
| Prisma Studio | 5556 |
| PostgreSQL | 5432 |
| Redis | 6379 |

### Essential Commands
```bash
pnpm dev              # Start all apps
pnpm build            # Build all packages
pnpm typecheck        # TypeScript validation
pnpm lint:fix         # Fix linting issues
pnpm db:up            # Start database containers
```

---

## Project Overview

Fullstack TypeScript monorepo starter using **Turborepo + pnpm workspaces**.

**Stack**: Next.js 15 (App Router) + NestJS 11 + Prisma + PostgreSQL + Redis

---

## Architecture

### Monorepo Structure

```
fullstack-starter/
├─ apps/
│  ├─ api/              # NestJS backend
│  │  ├─ src/
│  │  │  ├─ config/     # Typed configuration service
│  │  │  ├─ health/     # Health check endpoints
│  │  │  ├─ prisma/     # Database service & extensions
│  │  │  ├─ users/      # User module (controller, service, repository)
│  │  │  └─ common/     # Filters, middleware, DTOs
│  │  └─ prisma/        # Schema & migrations
│  │
│  └─ client/           # Next.js frontend
│     └─ src/
│        ├─ app/        # App Router pages
│        ├─ components/ # React components
│        │  ├─ ui/      # Shadcn UI components
│        │  ├─ home/    # Page-specific components
│        │  └─ skeletons/ # Loading states
│        └─ hooks/      # Custom React hooks
│
├─ packages/
│  ├─ config/           # Environment validation (Zod)
│  ├─ core/             # Shared constants & enums
│  ├─ data/             # Zod schemas, validators, types
│  ├─ i18n/             # Internationalization
│  └─ ui/               # Shared React components
│
└─ tooling/             # ESLint, Prettier, TypeScript, Tailwind configs
```

### Data Flow

```
@repo/core (constants) → @repo/data (schemas + types) → apps (API & Client)
```

- **@repo/data**: Single source of truth for validation schemas
- Types are inferred from Zod schemas using `z.infer<typeof schema>`

---

## Commands

### Development
```bash
pnpm dev              # Start all apps (API on :3000, Client on :3001)
pnpm dev:api          # NestJS only
pnpm dev:client       # Next.js only (uses Turbopack)
```

### Build & Quality
```bash
pnpm build            # Build all packages
pnpm typecheck        # Run TypeScript checks
pnpm lint             # Lint all packages
pnpm lint:fix         # Auto-fix lint issues
pnpm format           # Format with Prettier
```

### Database (Docker required)
```bash
pnpm db:up            # Start PostgreSQL + Redis
pnpm db:down          # Stop containers
pnpm db:studio        # Open Prisma Studio (:5556)

# Prisma commands (run from apps/api)
pnpm --filter api run prisma:migrate   # Run migrations
pnpm --filter api run prisma:generate  # Generate client
pnpm --filter api run prisma:seed      # Seed database
pnpm --filter api run prisma:reset     # Reset database
```

### Docker (Production)
```bash
docker-compose up -d              # Start full stack
docker-compose logs -f api        # View API logs
docker-compose down               # Stop all containers
```

### Testing
```bash
pnpm test             # Run all tests
pnpm test:e2e         # E2E tests
```

---

## Type Safety

### Type Guards (@repo/core)

**Helper para validar valores sin `any`**:
```typescript
import { isInArray } from '@repo/core';

// En vez de: if (locales.includes(locale as any))
if (isInArray(locale, locales)) {
  // TypeScript infiere que locale es del tipo correcto
}
```

### URL State Management (nuqs)

**Query params type-safe con sincronización automática**:
```typescript
'use client';
import { useQueryStates } from 'nuqs';
import { pageParser, searchParser } from '@repo/data';

export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    page: pageParser,         // Número con default 1
    search: searchParser      // String con debounce 300ms
  });
  
  // Actualiza URL automáticamente
  setFilters({ search: 'user', page: 1 });
}
```

**Parsers personalizados** en `@repo/data/parsers`:
- `pageParser` - Paginación (número ≥ 1)
- `searchParser` - Búsqueda con debounce 300ms
- `sortParser` / `sortDirectionParser` - Ordenamiento
- `userRoleFilterParser` - Filtro de rol (`ADMIN` | `USER`)
- `statusFilterParser` - Filtro de estado
- `dateParser` / `dateRangeParser` - Fechas
- `booleanParser` - Booleanos

Ver guía completa en `docs/NUQS_GUIDE.md`

## Code Patterns

### Backend (NestJS)

#### Module Structure
```
users/
├─ users.module.ts      # Module definition
├─ users.controller.ts  # HTTP endpoints with Swagger decorators
├─ users.service.ts     # Business logic
├─ users.repository.ts  # Database operations
└─ dto/                 # Request/Response DTOs
   ├─ create-user.dto.ts
   ├─ update-user.dto.ts
   └─ user-response.dto.ts
```

#### Controller Pattern (with Swagger)
```typescript
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  create(@Body() dto: CreateUser) {
    return this.usersService.create(dto);
  }
}
```

#### Repository Pattern
```typescript
@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params?: { where?: Prisma.UserWhereInput }) {
    return this.prisma.user.findMany(params);
  }
}
```

#### Configuration Service
```typescript
// Access typed config anywhere
const port = this.configService.port;
const swagger = this.configService.swagger;
```

### Frontend (Next.js)

#### Server vs Client Components
```typescript
// Server Component (default) - no directive needed
export default function Page() {
  return <div>Static content</div>;
}

// Client Component - add directive
'use client';
export function InteractiveComponent() {
  const [state, setState] = useState();
}
```

#### Form Pattern (React Hook Form + Zod + Shadcn)
```typescript
import { useUserForm } from '@/hooks/use-user-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';

function UserForm() {
  const { form, onSubmit, isSubmitting } = useUserForm({
    onSubmit: async (data) => { /* handle submit */ }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

#### Dynamic Imports for Code Splitting
```typescript
const HeavyComponent = dynamic(
  () => import('@/components/heavy').then(m => m.HeavyComponent),
  { loading: () => <Skeleton />, ssr: false }
);
```

### Shared Types (@repo/data)

#### API Response Types
```typescript
import { ApiResponse, PaginatedResponse, UserId } from '@repo/data/types';

// Generic response wrapper
interface Response extends ApiResponse<User> {
  success: true;
  data: User;
}

// Branded types for type safety
const userId: UserId = createUserId('user_123');
```

---

## Skill-Specific Guidelines

### Docker

**Development**: Use `pnpm db:up` for local DB (faster iteration)

**Production Build**:
```bash
docker-compose up -d --build
```

**Multi-stage builds** keep images small (~100MB vs ~1GB):
- `deps` stage: Install dependencies
- `builder` stage: Compile TypeScript
- `runner` stage: Minimal runtime image

### Prisma

**After schema changes**:
```bash
pnpm --filter api run prisma:generate   # Regenerate client
pnpm --filter api run prisma:migrate    # Create migration
```

**Indexes** are defined in schema for common queries:
```prisma
@@index([email, deletedAt], name: "idx_users_email_deleted")
@@index([role, isActive, deletedAt], name: "idx_users_role_active_deleted")
```

**Soft Delete**: Use `deletedAt` field. Query active records with `where: { deletedAt: null }`.

### Swagger

**Required decorators** for all endpoints:
- `@ApiTags('resource')` - Controller level
- `@ApiOperation({ summary })` - Method level
- `@ApiResponse({ type })` - All response types

**Access docs**: http://localhost:3000/api/docs

### Forms (React Hook Form + Zod)

**Always use schemas from @repo/data**:
```typescript
import { createUserSchema, CreateUser } from '@repo/data';
const form = useForm<CreateUser>({
  resolver: zodResolver(createUserSchema)
});
```

**FormFieldWrapper** simplifies common patterns:
```typescript
<FormFieldWrapper form={form} name="email" label="Email" type="email" />
```

### Turborepo

**Pipeline dependencies** in `turbo.json`:
- `build` depends on `^build` (workspace dependencies)
- `typecheck` and `lint` have no outputs (fast checks)
- `db:*` tasks have `cache: false`

**Run affected packages only**:
```bash
turbo run build --filter=...[origin/main]
```

### ESLint/Prettier

**Import ordering** is automatic:
1. builtin (node:*)
2. external (react, next)
3. internal (@repo/*)
4. relative (./)

**Tailwind classes** are auto-sorted by `prettier-plugin-tailwindcss`.

### Health Checks

**Endpoints**:
- `GET /api/v1/health` - Basic health
- `GET /api/v1/health/db` - Database connectivity

---

## Working with This Codebase

| Task | Location | Notes |
|------|----------|-------|
| New API endpoint | `apps/api/src/` | Add schema to `@repo/data` |
| New page | `apps/client/src/app/` | Server Component by default |
| New shared type | `packages/data/src/types/` | Export from index.ts |
| New constant/enum | `packages/core/` | Used by both apps |
| New UI component | `apps/client/src/components/ui/` | Follow Shadcn patterns |
| Environment change | `packages/config/` | Update Zod schema |
| URL query params | `@repo/data/parsers/` | Create parser, export, use in hooks |
| Type guard | `@repo/core/utils/` | Use `isInArray` helper |

---

## Code Standards

**Commit Format**: `<type>(<scope>): <subject>`
- Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
- Scopes: api, client, data, core, config, docs, ci
- Example: `feat(api): add user authentication endpoint`

**Naming**:
- Files: `kebab-case.ts`
- React Components: `PascalCase.tsx`
- Variables/Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

---

## Troubleshooting

### Database connection fails
```bash
pnpm db:up  # Ensure containers are running
docker ps   # Verify containers are healthy
```

### Prisma client out of sync
```bash
pnpm --filter api run prisma:generate
```

### Type errors after package changes
```bash
pnpm build              # Rebuild all packages
pnpm typecheck          # Verify types
```

### ESLint import errors
```bash
pnpm install            # Reinstall dependencies
pnpm lint:fix           # Auto-fix issues
```

### Next.js hydration errors
- Ensure client components have `'use client'` directive
- Check for server/client component boundary violations
