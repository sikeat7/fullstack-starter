/**
 * @fileoverview @repo/data entry point - Single source of truth for data
 * @purpose Exports validation schemas (Zod), validators, entities and shared types.
 *          This package is the "single source of truth" for data structures used in API and Client.
 *
 * @example Granular imports (recommended for better tree-shaking):
 * ```ts
 * import { userSchema } from '@repo/data/schemas';
 * import { validateEmail } from '@repo/data/validators';
 * import { User } from '@repo/data/entities';
 * import { ApiResponse, UserId } from '@repo/data/types';
 * import { z } from 'zod'; // Import zod directly
 * ```
 *
 * @example Full import (all modules):
 * ```ts
 * import { userSchema, validateEmail, User, ApiResponse } from '@repo/data';
 * ```
 */

export * from './schemas';
export * from './validators';
export * from './entities';
export * from './types';
export * from './parsers/query-params.parsers';

// Note: Import { z } from 'zod' directly for better tree-shaking.
// Re-exporting zod here would include it in bundles even when not needed.