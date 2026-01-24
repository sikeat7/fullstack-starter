# Changelog

## 2026-01-24

### ✨ Nuevas Funcionalidades

#### 🎯 Type-Safe URL State Management con nuqs

Se implementó **nuqs** para manejar query params de forma type-safe en toda la aplicación.

**Agregado:**
- ✅ Instalación y configuración de `nuqs` en el cliente
- ✅ `NuqsAdapter` configurado en el layout principal
- ✅ Parsers personalizados type-safe en `@repo/data/parsers`
- ✅ Hook reutilizable `useUserFilters` para filtros comunes
- ✅ Componente de ejemplo completo con filtros, búsqueda y paginación
- ✅ Documentación completa en `docs/NUQS_GUIDE.md`

**Parsers disponibles:**
- `pageParser` - Paginación (default: 1)
- `pageSizeParser` - Tamaño de página (default: 10)
- `searchParser` - Búsqueda con debounce 300ms
- `sortParser` / `sortDirectionParser` - Ordenamiento
- `userRoleFilterParser` - Filtro por rol
- `statusFilterParser` - Filtro por estado
- `dateParser` / `dateRangeParser` - Manejo de fechas
- `booleanParser` - Valores booleanos

**Ejemplo de uso:**
```typescript
'use client';
import { useQueryStates } from 'nuqs';
import { pageParser, searchParser } from '@repo/data';

export function DataTable() {
  const [filters, setFilters] = useQueryStates({
    page: pageParser,
    search: searchParser
  });
  
  return (
    <input 
      value={filters.search}
      onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
    />
  );
}
```

#### 🛡️ Eliminación de `any` con Type Guards

**Problema resuelto:** Validación type-safe de arrays sin usar `as any`.

**Agregado:**
- ✅ Helper `isInArray<T>()` en `@repo/core/utils/type-guards.ts`
- ✅ Helper `validateOrDefault<T>()` para validación con fallback
- ✅ Actualización de validaciones de `locale` en i18n

**Antes:**
```typescript
if (!locales.includes(locale as any)) {
  notFound();
}
```

**Después:**
```typescript
import { isInArray } from '@repo/core';

if (!isInArray(locale, locales)) {
  notFound();
}
```

### 📦 Dependencias Actualizadas

- **client**: Agregado `nuqs@^2.8.6`
- **client**: Agregado `@repo/core` como dependencia
- **@repo/data**: Agregado `nuqs` como dependencia

### 📝 Documentación

- ✅ Guía completa de nuqs en `docs/NUQS_GUIDE.md`
- ✅ Actualización de `CLAUDE.md` con sección de Type Safety
- ✅ Ejemplo funcional en `apps/client/src/components/examples/users-table-with-filters.tsx`
- ✅ Hook reutilizable documentado en `apps/client/src/hooks/use-user-filters.ts`

### 🎨 UI Components

- ✅ Agregado componente `Badge` de shadcn/ui
- ✅ Nuevo ejemplo interactivo de filtros en la página principal
- ✅ Tabla de usuarios con filtros, búsqueda y paginación

### 🧪 Testing

- ✅ Todos los typechecks pasan exitosamente
- ✅ Zero errores de TypeScript
- ✅ Build exitoso en todo el monorepo

### 🏗️ Arquitectura

**Flujo de datos type-safe:**
```
@repo/core (type guards + constants)
    ↓
@repo/data (parsers + schemas)
    ↓
apps/client (hooks + components)
```

**Beneficios:**
1. **Type Safety**: Inferencia completa de tipos desde parsers
2. **Reutilización**: Parsers compartidos en todo el monorepo
3. **UX Mejorada**: URLs compartibles con estado de filtros
4. **DX Mejorada**: Cero uso de `any`, autocompletado perfecto
5. **Performance**: Debounce automático en búsquedas
6. **Historia**: Navegación con botón de atrás del navegador

### 📚 Recursos

- [Documentación de nuqs](https://nuqs.dev/)
- [Guía del proyecto](docs/NUQS_GUIDE.md)
- [Ejemplo completo](apps/client/src/components/examples/users-table-with-filters.tsx)
- [Parsers](packages/data/src/parsers/query-params.parsers.ts)
- [Type Guards](packages/core/src/utils/type-guards.ts)
