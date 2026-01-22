# Client Packages (apps/client)

This document lists the key packages installed in the **Client** app and how we use them.

## Core

### Next.js + React
- **Framework**: Next.js (App Router)
- **UI**: React
- **DX**: TypeScript-first

---

## Forms & Validation

### **react-hook-form**
High-performance form state management with minimal re-renders.

**Why**
- Fast, lightweight, and ergonomic
- Works great with TypeScript
- Integrates cleanly with schema validation via resolvers

**Example**

```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

See: `src/components/examples/form-example.tsx`

### **@hookform/resolvers**
Adapters to plug schema validators (Zod/Yup/etc.) into react-hook-form.

```tsx
import { zodResolver } from '@hookform/resolvers/zod';

useForm({
  resolver: zodResolver(mySchema),
});
```

### **zod (via @repo/data)**
Zod is installed in `@repo/data` and re-exported to keep **one source of truth** across the monorepo.

✅ Correct:

```tsx
import { z } from '@repo/data';
```

❌ Avoid in apps:

```tsx
// import { z } from 'zod';
```

---

## Server State / Fetching

### **@tanstack/react-query**
Server-state management: caching, refetching, retries, background sync, etc.

See: `src/components/examples/query-example.tsx`

### **@tanstack/react-query-devtools** (dev)
Devtools for debugging queries/mutations. Enabled in development in:
`src/lib/react-query.tsx`

---

## Tables

### **@tanstack/react-table**
Headless table engine (sorting/filtering/pagination) with full TS types.

See: `src/components/examples/table-example.tsx`

---

## Styling

### **Tailwind CSS**
Utility-first styling. Theme tokens are defined in `src/app/globals.css`.

### **clsx**
Conditional class composition.

### **class-variance-authority (cva)**
Variant-based styling helpers (often used in component APIs).

### **tailwind-merge**
Conflict-aware merging for Tailwind classes (used by the project `cn()` helper).

---

## Internationalization

### **next-intl**
i18n for Next.js App Router.

Configured in:
- `src/i18n/request.ts`
- `src/i18n/routing.ts`
- `src/middleware.ts`

Shared locales live in `packages/i18n/src/locales/`.

---

## Notes (monorepo conventions)

- **Shared data/contracts** should live in `@repo/data`.
- **Client-only libraries** (React Query, RHF, etc.) stay in `apps/client`.

