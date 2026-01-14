# @repo/core

## Purpose
Constants, enums and domain types shared between API and Client.

## What it contains
- **`constants/roles.ts`**: User roles (USER, ADMIN, OWNER, MANAGER, EMPLOYEE)
- **`constants/enums.ts`**: Business enums (business types, states, payment methods, etc.)

## When to use
When you need constant values or enums that must be consistent throughout the application.

**Example:**
```typescript
import { ROLES, PAYMENT_METHODS } from '@repo/core';
```
