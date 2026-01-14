# @repo/config

## Purpose
Validation and typing of environment variables with Zod.

## What it contains
- **`env.config.ts`**: Zod schema that validates all env vars (DATABASE_URL, JWT_SECRET, etc.)
- Fails fast at startup if any critical configuration is missing

## When to use
At application startup (in NestJS `main.ts`) to ensure everything is configured correctly.

**Example:**
```typescript
import { config } from '@repo/config';

// config is already validated and typed
console.log(config.DATABASE_URL);
```
