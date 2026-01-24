/**
 * @fileoverview API response types
 * @purpose Define standardized response types for API endpoints
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

/**
 * API error response
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

/**
 * Pagination query parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter operators for query building
 */
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'in'
  | 'notIn';

/**
 * Generic filter type
 */
export interface Filter<T> {
  field: keyof T;
  operator: FilterOperator;
  value: unknown;
}

/**
 * Query params with filters
 */
export interface QueryParams<T> extends PaginationParams {
  filters?: Filter<T>[];
  search?: string;
}

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Helper to create success result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Helper to create error result
 */
export function failure<E>(error: E): Result<never, E> {
  return { success: false, error };
}
