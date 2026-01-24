/**
 * @fileoverview Branded types for type-safe identifiers
 * @purpose Prevent mixing different ID types at compile time
 *
 * @example
 * const userId: UserId = 'user_123' as UserId;
 * const businessId: BusinessId = 'biz_456' as BusinessId;
 *
 * // This will cause a compile error:
 * // const wrongId: UserId = businessId;
 */

/**
 * Brand symbol for creating nominal types
 */
declare const brand: unique symbol;

/**
 * Generic branded type
 * Creates a nominal type from a base type
 */
export type Brand<T, TBrand extends string> = T & { readonly [brand]: TBrand };

/**
 * User ID branded type
 */
export type UserId = Brand<string, 'UserId'>;

/**
 * Business ID branded type
 */
export type BusinessId = Brand<string, 'BusinessId'>;

/**
 * Product ID branded type
 */
export type ProductId = Brand<string, 'ProductId'>;

/**
 * Order ID branded type
 */
export type OrderId = Brand<string, 'OrderId'>;

/**
 * Email address branded type
 */
export type Email = Brand<string, 'Email'>;

/**
 * URL branded type
 */
export type Url = Brand<string, 'Url'>;

/**
 * ISO date string branded type
 */
export type ISODateString = Brand<string, 'ISODateString'>;

/**
 * Positive integer branded type
 */
export type PositiveInt = Brand<number, 'PositiveInt'>;

/**
 * Currency code branded type (ISO 4217)
 */
export type CurrencyCode = Brand<string, 'CurrencyCode'>;

/**
 * Type guards and validators for branded types
 */

export function isUserId(value: string): value is UserId {
  return typeof value === 'string' && value.length > 0;
}

export function isEmail(value: string): value is Email {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function isPositiveInt(value: number): value is PositiveInt {
  return Number.isInteger(value) && value > 0;
}

export function isISODateString(value: string): value is ISODateString {
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
}

/**
 * Factory functions for creating branded types
 */

export function createUserId(id: string): UserId {
  if (!isUserId(id)) {
    throw new Error('Invalid user ID');
  }
  return id as UserId;
}

export function createEmail(email: string): Email {
  if (!isEmail(email)) {
    throw new Error('Invalid email address');
  }
  return email as Email;
}

export function createPositiveInt(value: number): PositiveInt {
  if (!isPositiveInt(value)) {
    throw new Error('Value must be a positive integer');
  }
  return value as PositiveInt;
}
