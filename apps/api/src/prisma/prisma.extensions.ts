import { Prisma } from '@prisma/client';

/**
 * Soft delete extension for Prisma
 *
 * This extension modifies the default behavior:
 * - `findMany`, `findFirst`, `findUnique` exclude soft-deleted records
 * - `delete` performs a soft delete (sets deletedAt)
 * - `deleteMany` performs bulk soft delete
 *
 * Use `$queryRaw` or disable extensions for hard deletes when needed.
 */
export const softDeleteExtension = Prisma.defineExtension({
  name: 'soft-delete',
  query: {
    $allModels: {
      async findMany({ model, args, query }) {
        // Add deletedAt filter if the model has this field
        if (hasDeletedAt(model)) {
          args.where = addDeletedAtFilter(args.where);
        }
        return query(args);
      },
      async findFirst({ model, args, query }) {
        if (hasDeletedAt(model)) {
          args.where = addDeletedAtFilter(args.where);
        }
        return query(args);
      },
      async findUnique({ model, args, query }) {
        if (hasDeletedAt(model)) {
          // Convert to findFirst to add the deletedAt filter
          const result = await query({
            ...args,
            where: addDeletedAtFilter(args.where),
          } as Parameters<typeof query>[0]);
          return result;
        }
        return query(args);
      },
      async delete({ model, args, query }) {
        if (hasDeletedAt(model)) {
          // Perform soft delete instead
          return (query as (args: unknown) => unknown)({
            ...args,
            data: { deletedAt: new Date() },
          });
        }
        return query(args);
      },
      async deleteMany({ model, args, query }) {
        if (hasDeletedAt(model)) {
          // Perform bulk soft delete
          return (query as (args: unknown) => unknown)({
            ...args,
            data: { deletedAt: new Date() },
          });
        }
        return query(args);
      },
    },
  },
});

// Models that support soft delete
const modelsWithSoftDelete = new Set(['User']);

function hasDeletedAt(model: string): boolean {
  return modelsWithSoftDelete.has(model);
}

function addDeletedAtFilter(where: any): any {
  return {
    ...where,
    deletedAt: null,
  };
}

/**
 * Extension to omit sensitive fields from responses
 */
export const omitPasswordExtension = Prisma.defineExtension({
  name: 'omit-password',
  result: {
    user: {
      password: {
        needs: {},
        compute() {
          return undefined;
        },
      },
    },
  },
});
