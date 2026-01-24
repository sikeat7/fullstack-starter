/**
 * @fileoverview Shared Prettier configuration
 * @purpose Define code style: single quotes, semicolons, 80 char width, etc.
 *
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  // Tailwind class ordering
  tailwindFunctions: ['cn', 'cva', 'clsx'],
};

export default config;
