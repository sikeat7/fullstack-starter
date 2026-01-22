# Monorepo Guide (this repo)

This repository is a **pnpm workspaces** + **Turborepo** monorepo:

- **Frontend**: Next.js (`apps/client`)
- **Backend**: NestJS + Prisma (`apps/api`)
- **Shared packages**: `packages/*` (e.g. `@repo/data`, `@repo/i18n`, `@repo/ui`)

The goal is to keep shared code inside `packages/` and consume it from apps without duplication.

---

## 1) Repo structure

- **`apps/`**: runnable applications/services
  - `apps/client`: Next.js
  - `apps/api`: NestJS
- **`packages/`**: reusable libraries (not apps)
  - `@repo/data`: shared Zod schemas/types/entities
  - `@repo/i18n`: shared locales + helpers
  - `@repo/ui`: shared UI components (optional)
- **`tooling/`**: shared configuration (eslint, typescript, prettier, etc.)

This follows Turborepo's recommended layout:
`https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository`

---

## 2) Import conventions

In a healthy monorepo, you should be able to look at an import and immediately know where it comes from.

### A) Shared packages
- **Prefix**: `@repo/*`
- **Meaning**: a workspace package under `packages/*`

```ts
import { CreateUser } from '@repo/data';
import en from '@repo/i18n/locales/en.json';
import { Button } from '@repo/ui/button';
```

### B) Client internal imports
- **Prefix**: `@/*`
- **Config**: `apps/client/tsconfig.json` (`paths: { "@/*": ["./src/*"] }`)

```ts
import { Button } from '@/components/ui/button';
```

### C) API internal imports
- **Prefix**: `#/*`
- **Config**: `apps/api/tsconfig.json` (`paths: { "#/*": ["src/*"] }`)

```ts
import { PrismaService } from '#/prisma/prisma.service';
```

**Rule of thumb**: avoid `../../..` inside apps and avoid importing another package's `src/` directly.

---

## 3) Compiled packages: why `dist/` exists

This repo uses the **compiled packages** pattern:

- Source lives in `packages/<pkg>/src`
- Build output lives in `packages/<pkg>/dist`
- Packages declare entrypoints via:
  - `"main": "dist/index.js"`
  - `"types": "dist/index.d.ts"`
  - `"exports": { ... }`

Why this matters:
- Next/Nest/Node consume `@repo/*` as real packages
- TypeScript resolves types from `.d.ts`
- Avoids `rootDir`/`TS6059`-style issues that happen when an app “absorbs” another package's `src`

### Clean tasks
Each package provides a `clean` script that removes:
- `dist/`
- `tsconfig.tsbuildinfo` (TypeScript incremental cache)

This avoids half-built states where `dist/index.js` is missing and the runtime can't resolve a package.

---

## 4) Turborepo: why `dev` depends on `build`

Turborepo uses the workspace dependency graph (lockfile + `package.json`) to know:

- If `apps/client` depends on `@repo/i18n`, `@repo/i18n` must build first
- Then `dev` can start the app

In `turbo.json`, `dev` depends on `^build`. Meaning:
> Before running `dev` for this package/app, run `build` for its internal dependencies.

So when you run `pnpm dev`, Turborepo:
1) builds shared libs
2) starts `client` and `api`

---

## 5) Shared i18n (single source of truth)

Goal: **one** `es.json` and `en.json` used by both frontend and backend.

### Where they live
- `packages/i18n/src/locales/es.json`
- `packages/i18n/src/locales/en.json`

### How the frontend consumes them (Next + next-intl)

```ts
import en from '@repo/i18n/locales/en.json';
import es from '@repo/i18n/locales/es.json';
```

### How the backend consumes them (Nest)

The backend uses `nestjs-i18n` and points to the JSON directory from the package in a robust way (no fragile relative paths).

---

## 6) Common commands

### Install

```bash
pnpm install
```

### Dev (monorepo)

```bash
pnpm dev
```

This starts:
- Next: `http://localhost:3001`
- API: `http://localhost:3000/api/v1`
- Swagger: `http://localhost:3000/api/docs`

### Build

```bash
pnpm build
```

---

## 7) Database (Postgres) & health checks

The API uses Prisma and connects to Postgres on `localhost:5432` by default (based on `DATABASE_URL`).

### Start DB (Docker)

```bash
pnpm db:up
```

### Health endpoints

- `GET /api/v1/health` → general status
- `GET /api/v1/health/db` → DB status

If the DB is not running, `/health/db` returns `status: "down"` instead of crashing the API.

---

## 8) Quick troubleshooting

### “Module not found: Can't resolve '@repo/i18n'”

Usually means `dist/` is missing or incomplete.

Typical fix:

```bash
pnpm -r --filter @repo/core --filter @repo/data --filter @repo/i18n --filter @repo/config clean
pnpm -r --filter @repo/core --filter @repo/data --filter @repo/i18n --filter @repo/config build
```

### “useTranslations is not callable within an async component”

In async Server Components, use:
- `await getTranslations()` (server)

In Client Components, use:
- `useTranslations()` (hook)

---

## 9) Adding a new shared package

Minimal checklist:

1) Create `packages/<new>/package.json` with `name` and `exports`
2) Add `tsconfig.json` with `rootDir: "src"`, `outDir: "dist"`, and `declaration: true`
3) Add the dependency to apps using `"workspace:*"`
4) Ensure it has `build` and `clean`

