/**
 * @fileoverview Specific validators for user operations
 * @purpose Define schemas for creating, updating, logging in users with specific validations
 */

import { z } from 'zod';
import { userSchema } from '../schemas/user.schema';
import { USER_ROLE_VALUES, ROLES } from '@repo/core';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const PASSWORD_MESSAGE = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';

const passwordFieldSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100, 'Password is too long')
  .regex(PASSWORD_REGEX, PASSWORD_MESSAGE);

export const createUserSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    emailVerifiedAt: true,
    isActive: true,
  })
  .extend({
    password: passwordFieldSchema,
    role: z
      .enum(USER_ROLE_VALUES as [string, ...string[]])
      .default(ROLES.USER)
  });

export type CreateUser = z.infer<typeof createUserSchema>;


export const updateUserSchema = userSchema
  .partial()
  .extend({
    id: userSchema.shape.id,
    password: passwordFieldSchema.optional(),
  });

export type UpdateUser = z.infer<typeof updateUserSchema>;


export const loginUserSchema = userSchema
  .pick({ email: true })
  .extend({
    password: z.string(),
  });

export type LoginUser = z.infer<typeof loginUserSchema>;


export const changePasswordSchema = z.object({
  id: userSchema.shape.id,
  currentPassword: passwordFieldSchema,
  newPassword: passwordFieldSchema,
});

export type ChangePassword = z.infer<typeof changePasswordSchema>;


export const publicUserSchema = userSchema.omit({
  emailVerifiedAt: true,
});

export type PublicUser = z.infer<typeof publicUserSchema>;

