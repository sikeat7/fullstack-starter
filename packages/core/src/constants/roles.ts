/**
 * @fileoverview System roles and permissions definition
 * @purpose Define user roles (USER, ADMIN), merchants (OWNER, MANAGER) and employees.
 *          Used for access control and authorization throughout the application.
 */

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export const MERCHANT_ROLES = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
} as const;

export const EMPLOYEE_ROLES = {
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
} as const;

export const USER_ROLE_VALUES = Object.values(ROLES);
export const MERCHANT_ROLE_VALUES = Object.values(MERCHANT_ROLES);
export const EMPLOYEE_ROLE_VALUES = Object.values(EMPLOYEE_ROLES);

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
export type MerchantRole = (typeof MERCHANT_ROLES)[keyof typeof MERCHANT_ROLES];
export type EmployeeRole = (typeof EMPLOYEE_ROLES)[keyof typeof EMPLOYEE_ROLES];
