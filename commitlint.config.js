module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature', // Custom type
        'fix', // Bug fix
        'docs', // Documentation
        'style', // Formatting-only changes
        'refactor', // Refactor
        'test', // Tests
        'chore', // Maintenance
        'perf', // Performance
        'ci', // CI/CD
        'build', // Build
        'revert', // Revert
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [0], // Disable subject casing validation
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'scope-empty': [2, 'never'], // Require a scope
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 200], // Allow up to 200 characters in the subject
  },
};
