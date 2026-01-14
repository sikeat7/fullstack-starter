/**
 * @fileoverview Shared Jest base configuration
 * @purpose Configure Jest with coverage and jsdom for testing in the monorepo
 */

import type { Config } from 'jest';

export const config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'ts', 'json'],
  testEnvironment: 'jsdom',
} as const satisfies Config;
