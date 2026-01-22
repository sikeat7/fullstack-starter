# Guía del Monorepo (este proyecto)

Este repo es un **monorepo** basado en **pnpm workspaces** + **Turborepo**, con:

- **Frontend**: Next.js (`apps/client`)
- **Backend**: NestJS + Prisma (`apps/api`)
- **Paquetes compartidos**: `packages/*` (ej: `@repo/data`, `@repo/i18n`, `@repo/ui`)

La idea es que el código compartido viva en `packages/` y sea consumido por las apps sin duplicación.

---

## 1) Estructura del repo

- **`apps/`**: aplicaciones/servicios “ejecutables”
  - `apps/client`: Next.js
  - `apps/api`: NestJS
- **`packages/`**: librerías reutilizables (no “apps”)
  - `@repo/data`: esquemas/tipos (Zod) compartidos
  - `@repo/i18n`: traducciones compartidas (JSON) + utilidades
  - `@repo/ui`: componentes UI compartidos
- **`tooling/`**: config compartida (eslint, typescript, prettier, etc.)

Esto sigue la estructura recomendada por Turborepo: apps separadas de packages, y cada package con su `package.json` y entrypoints bien definidos vía `exports`.  
Referencia: https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository

---

## 2) Cómo se resuelven imports (convención del proyecto)

En un monorepo sano, querés mirar un import y entender “de dónde viene”:

### **A) Paquetes compartidos**
- **Prefijo**: `@repo/*`
- **Significa**: “esto vive en `packages/*` (workspace package)”
- Ejemplos:

```ts
import { CreateUser } from '@repo/data';
import en from '@repo/i18n/locales/en.json';
import { Button } from '@repo/ui/button';
```

### **B) Imports internos del Frontend**
- **Prefijo**: `@/*`
- **Config**: `apps/client/tsconfig.json` (`paths: { "@/*": ["./src/*"] }`)
- Ejemplo:

```ts
import { Button } from '@/components/ui/button';
```

### **C) Imports internos del Backend**
- **Prefijo**: `#/*`
- **Config**: `apps/api/tsconfig.json` (`paths: { "#/*": ["src/*"] }`)
- Ejemplo:

```ts
import { PrismaService } from '#/prisma/prisma.service';
```

**Regla de oro:** evitá `../../..` dentro de las apps y evitá importar `src/` de otro paquete.

---

## 3) “Compiled packages”: por qué existe `dist/`

Este repo usa el patrón de **paquetes compilados**:

- El código fuente vive en `packages/<pkg>/src`
- El output compilado vive en `packages/<pkg>/dist`
- Los paquetes declaran sus entrypoints con:
  - `"main": "dist/index.js"`
  - `"types": "dist/index.d.ts"`
  - `"exports": { ... }`

Esto es importante porque:
- Next/Nest/Node consumen `@repo/*` como **paquetes reales**
- TypeScript obtiene tipos desde `.d.ts`
- Evitás errores tipo `rootDir`/`TS6059` que aparecen cuando una app “absorbe” el `src` de otro paquete

### Limpieza
Cada package tiene un `clean` que borra:
- `dist/`
- `tsconfig.tsbuildinfo` (cache incremental de TypeScript)

Eso evita builds “incompletos” donde falta `dist/index.js` y luego el runtime no puede resolver el paquete.

---

## 4) Turborepo: cómo se calcula el orden y por qué `dev` depende de `build`

Turborepo usa el grafo de dependencias del workspace (lockfile + `package.json`) para saber:

- Si `apps/client` depende de `@repo/i18n`, primero hay que construir `@repo/i18n`.
- Luego recién se ejecuta `dev` en la app.

En `turbo.json`, el task `dev` depende de `^build`. Esto significa:

> “Antes de correr `dev` para este paquete/app, corré `build` de sus dependencias internas”

Resultado: cuando corrés `pnpm dev`, Turborepo:
1) construye libs compartidas
2) levanta `client` y `api`

---

## 5) i18n compartido (single source of truth)

Objetivo: **un solo `es.json` y `en.json`** para front y back.

### Dónde viven
- `packages/i18n/src/locales/es.json`
- `packages/i18n/src/locales/en.json`

### Cómo se consumen en el frontend (Next + next-intl)
El frontend carga los mensajes desde el paquete:

```ts
import en from '@repo/i18n/locales/en.json';
import es from '@repo/i18n/locales/es.json';
```

### Cómo se consumen en el backend (Nest)
El backend usa `nestjs-i18n` y apunta al directorio de JSON del paquete, resuelto de forma robusta (sin rutas frágiles).

---

## 6) Comandos habituales

### Instalar dependencias

```bash
pnpm install
```

### Desarrollo (monorepo)

```bash
pnpm dev
```

Esto levanta:
- Next: `http://localhost:3001`
- API: `http://localhost:3000/api/v1`
- Swagger: `http://localhost:3000/api/docs`

### Build

```bash
pnpm build
```

---

## 7) Base de datos (Postgres) y healthcheck

La API usa Prisma y se conecta a Postgres en `localhost:5432` por defecto (según tu `DATABASE_URL`).

### Levantar DB (Docker)

```bash
pnpm db:up
```

### Health endpoints

- `GET /api/v1/health` → estado general
- `GET /api/v1/health/db` → **estado de DB**

Si la DB no está corriendo, `/health/db` devuelve `status: "down"` en vez de tirar abajo la API.

---

## 8) Troubleshooting rápido

### “Module not found: Can't resolve '@repo/i18n'”
Normalmente significa que falta `dist/` o está incompleto.

Solución típica:

```bash
pnpm -r --filter @repo/core --filter @repo/data --filter @repo/i18n --filter @repo/config clean
pnpm -r --filter @repo/core --filter @repo/data --filter @repo/i18n --filter @repo/config build
```

### “useTranslations is not callable within an async component”
En Server Components `async`, usar:
- `await getTranslations()` (server)
En Client Components, usar:
- `useTranslations()` (hook)

---

## 9) Cómo agregar un nuevo package compartido

Checklist mínima:

1) Crear `packages/<nuevo>/package.json` con `name` y `exports`
2) `tsconfig.json` con `rootDir: "src"` y `outDir: "dist"` y `declaration: true`
3) Agregar dependencia en apps con `"workspace:*"`
4) Asegurar que tenga `build` y `clean`

---

Si querés, podemos extender esta guía con:
- reglas de versionado
- release strategy
- patrón para “schemas + DTOs” con Zod

