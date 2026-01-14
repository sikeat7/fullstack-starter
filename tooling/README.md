# Tooling

## Purpose
Shared development tool configurations for the entire monorepo.

## What it contains

### `eslint/`
ESLint configurations for different project types:
- `base.js`: Base config with TypeScript
- `nest.js`: For NestJS (API)
- `next.js`: For Next.js (Client)
- `library.js`: For shared packages

### `jest/`
Jest configurations for testing:
- `base.ts`: Base config
- `nest.ts`: For NestJS
- `next.ts`: For Next.js

### `prettier/`
Code formatting configuration (single quotes, semicolons, etc.)

### `tailwind/`
Shared Tailwind CSS config

### `typescript/`
Base TypeScript configurations:
- `base.json`: Base for all
- `nestjs.json`: For NestJS
- `nextjs.json`: For Next.js
- `react-library.json`: For shared React components

## Why it exists
Centralizing configuration avoids duplication and ensures consistency across the entire monorepo.
