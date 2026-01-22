/**
 * @fileoverview User validation schema
 * @purpose Define the structure and validations for a user (email, name, role, etc.)
 */

import { z } from 'zod';
import { baseSchema } from './base.schema';
import { USER_ROLE_VALUES } from '@repo/core';
// Import directo para evitar ciclos: schemas -> validators(index) -> user.validators -> schemas
import { emailField, textField } from '../validators/common.validators';

export const userSchema = baseSchema.extend({
  email: emailField(),

  firstName: textField('first name'),

  lastName: textField('last name'),

  profilePicture: z.string().url('Invalid image URL').nullable(),

  role: z.enum(USER_ROLE_VALUES as [string, ...string[]]),

  emailVerifiedAt: z.date().nullable(),

  isActive: z.boolean(),
});

export type User = z.infer<typeof userSchema>;