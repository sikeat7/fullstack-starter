/**
 * @fileoverview Reusable common validators
 * @purpose Helper functions to create validated fields (email, phone, text, etc.)
 */

import { z } from 'zod';

export const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^0\d{9,10}$/;

export const NAME_MESSAGE = 'Can only contain letters';
export const EMAIL_MESSAGE = 'Invalid email';
export const PHONE_MESSAGE = 'Invalid phone number';


/**
 * Creates a text field with letters-only validation
 *
 * @param fieldName - Field name (for error messages)
 * @returns Zod schema for validating text with letters only
 *
 * @example
 * ```typescript
 * firstName: textField('first name'),
 * lastName: textField('last name'),
 * businessName: textField('business name'),
 * productName: textField('product name'),
 * ```
 */
export const textField = (fieldName: string) => z
  .string()
  .min(1, `${fieldName} is required`)
  .max(50, `${fieldName} is too long`)
  .regex(NAME_REGEX, `${fieldName} ${NAME_MESSAGE}`);

/**
 * Creates an email field with standard validation
 *
 * @param fieldName - Field name (for error messages)
 * @returns Zod schema for validating emails
 *
 * @example
 * ```typescript
 * email: emailField('email'),
 * contactEmail: emailField('contact email'),
 * businessEmail: emailField('business email'),
 * ```
 */
export const emailField = (fieldName: string = 'email') => z
  .string()
  .email(`Invalid ${fieldName}`)
  .max(255, `${fieldName} is too long`);

/**
 * Creates a phone field with Argentine validation
 *
 * @param fieldName - Field name (for error messages)
 * @returns Zod schema for validating phones
 *
 * @example
 * ```typescript
 * phone: phoneField('phone'),
 * mobile: phoneField('mobile'),
 * businessPhone: phoneField('business phone'),
 * ```
 */
export const phoneField = (fieldName: string = 'phone') => z
  .string()
  .min(1, `${fieldName} is required`)
  .max(15, `${fieldName} is too long`)
  .regex(PHONE_REGEX, `${fieldName} ${PHONE_MESSAGE}`);

/**
 * Creates a free text field (without character restrictions)
 *
 * @param fieldName - Field name (for error messages)
 * @param maxLength - Maximum text length (default: 255)
 * @returns Zod schema for validating free text
 *
 * @example
 * ```typescript
 * description: textAreaField('description', 500),
 * notes: textAreaField('notes', 1000),
 * address: textAreaField('address'),
 * ```
 */
export const textAreaField = (fieldName: string, maxLength: number = 255) => z
  .string()
  .min(1, `${fieldName} is required`)
  .max(maxLength, `${fieldName} is too long`);
