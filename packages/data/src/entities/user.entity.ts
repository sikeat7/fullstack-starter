/**
 * @fileoverview TypeScript interface for User entity
 * @purpose Define the data structure of a user as it comes from the database (with password)
 */

import { UserRole } from '@repo/core';

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  role: UserRole;
  emailVerifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
