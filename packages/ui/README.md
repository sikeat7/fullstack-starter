# @repo/ui

## Purpose
Shared React components between frontend applications (Client, Admin, etc.)

## What it contains
Reusable UI components with consistent styles:
- `button.tsx`
- `card.tsx`
- `code.tsx`

## When to use
When you need UI components that should look the same across all frontend apps.

**Example:**
```typescript
import { Button, Card } from '@repo/ui';
```

## Note
Ideally these components should use a design system (e.g.: shadcn/ui, Radix, etc.)
