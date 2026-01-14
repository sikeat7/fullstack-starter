/**
 * @fileoverview Enums and business domain constants
 * @purpose Define business types, onboarding states, payment methods, etc.
 *          Used throughout the application to maintain consistency in allowed values.
 */

export const BUSINESS_TYPES = {
  MERCHANT: 'MERCHANT',
  SUPPLIER: 'SUPPLIER',
} as const;

export const ONBOARDING_STATES = {
  PENDING: 'PENDING',
  IN_PROCESS: 'IN_PROCESS',
  COMPLETED: 'COMPLETED',
} as const;

export const INVOICE_TYPES = {
  A: 'A',
  B: 'B',
  C: 'C',
} as const;

export const CATEGORY_TYPES = {
  PRODUCT: 'PRODUCT',
  MERCHANT: 'MERCHANT',
  SUPPLIER: 'SUPPLIER',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'CASH',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  CHECK: 'CHECK',
  DIGITAL_WALLET: 'DIGITAL_WALLET',
} as const;

export const MERCHANT_SUPPLIER_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

// Arrays para Zod
export const BUSINESS_TYPE_VALUES = Object.values(BUSINESS_TYPES);
export const ONBOARDING_STATE_VALUES = Object.values(ONBOARDING_STATES);
export const INVOICE_TYPE_VALUES = Object.values(INVOICE_TYPES);
export const CATEGORY_TYPE_VALUES = Object.values(CATEGORY_TYPES);
export const PAYMENT_METHOD_VALUES = Object.values(PAYMENT_METHODS);
export const MERCHANT_SUPPLIER_STATUS_VALUES = Object.values(
  MERCHANT_SUPPLIER_STATUS,
);

// Tipos TypeScript
export type BusinessType = (typeof BUSINESS_TYPES)[keyof typeof BUSINESS_TYPES];
export type OnboardingState =
  (typeof ONBOARDING_STATES)[keyof typeof ONBOARDING_STATES];
export type InvoiceType = (typeof INVOICE_TYPES)[keyof typeof INVOICE_TYPES];
export type CategoryType = (typeof CATEGORY_TYPES)[keyof typeof CATEGORY_TYPES];
export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];
export type MerchantSupplierStatus =
  (typeof MERCHANT_SUPPLIER_STATUS)[keyof typeof MERCHANT_SUPPLIER_STATUS];
