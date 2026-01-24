/**
 * @fileoverview Shared ESLint base configuration
 * @purpose Configure ESLint with TypeScript, Prettier and Turbo for the entire monorepo
 */

import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importXPlugin from "eslint-plugin-import-x";
import turboPlugin from "eslint-plugin-turbo";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      "import-x": importXPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // Remove unused imports automatically
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Disable base rule as it conflicts with unused-imports
      "@typescript-eslint/no-unused-vars": "off",
      // Import ordering by groups
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@repo/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
