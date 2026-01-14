/**
 * @fileoverview @repo/data entry point - Single source of truth for data
 * @purpose Exports validation schemas (Zod), validators, entities and shared types.
 *          This package is the "single source of truth" for data structures used in API and Client.
 */

export * from './schemas';
export * from './validators';
export * from './entities';

// Re-export zod for convenience
export { z } from 'zod';