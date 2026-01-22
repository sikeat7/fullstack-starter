# @repo/data

## Purpose
**Single source of truth** for validation schemas, shared types, and shared entities.

## What it contains
- **`schemas/`**: Zod schemas for validation
- **`validators/`**: reusable field validators/helpers
- **`entities/`**: shared entity types/interfaces
- **`zod`**: re-exported for convenience and consistency

## When to use
- Validate request bodies in the API
- Validate forms in the Client
- Share consistent contracts between frontend and backend

## Key advantage
**One schema → API validation + client validation + automatic TypeScript types**

---

## Zod import policy

This package re-exports Zod to keep a single version and a single “data contract” entrypoint in the monorepo.

### ✅ Correct (in apps)

```ts
import { z } from '@repo/data';
```

### ❌ Avoid (in apps)

```ts
// import { z } from 'zod';
```

### Why
- **Consistency**: the whole monorepo uses the same Zod version
- **Type safety**: types stay aligned across packages
- **Bundle size**: avoids duplicating contracts/validation logic
- **Maintainability**: upgrades happen in one place

---

## Examples

### Create a shared schema (inside @repo/data)

```ts
// packages/data/src/schemas/user.schema.ts
import { z } from 'zod'; // OK inside @repo/data
```

### Use in the API (NestJS)

```ts
import { createUserSchema, CreateUserDto } from '@repo/data';
```

### Use in the Client (Next.js + react-hook-form)

```ts
import { z } from '@repo/data';
import { createUserSchema } from '@repo/data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
```

---

## Package structure

```
packages/data/
├── src/
│   ├── schemas/
│   ├── validators/
│   ├── entities/
│   └── index.ts    # re-exports `z`
└── dist/
```

