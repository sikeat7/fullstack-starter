/**
 * @fileoverview Base schema for all entities
 * @purpose Define common fields (id, createdAt, updatedAt, deletedAt) that all entities inherit
 */

import { z } from 'zod';

export const baseSchema = z.object({
  id: z.string().cuid(),

  createdAt: z.date(),

  updatedAt: z.date(),

  deletedAt: z.date().nullable(),
});

export type Base = z.infer<typeof baseSchema>;
