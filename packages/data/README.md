# @repo/data

## Purpose
**Single source of truth** for validation schemas, types and shared entities.

## What it contains
- **`schemas/`**: Zod schemas for validation (user, order, base)
- **`validators/`**: Reusable validation helpers (email, phone, text)
- **`entities/`**: TypeScript interfaces for DB entities

## When to use
- To validate data in API (request body)
- To validate forms in Client
- To have consistent types between frontend and backend

## Key advantage
**1 schema = validation in API + validation in Client + automatic TypeScript types**

**Example:**
```typescript
// API and Client use the SAME schema
import { createOrderSchema } from '@repo/data';

const result = createOrderSchema.safeParse(data);
```
