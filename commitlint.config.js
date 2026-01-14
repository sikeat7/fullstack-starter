module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature', // Tu tipo personalizado
        'fix', // Corrección de bug
        'docs', // Documentación
        'style', // Cambios de formato
        'refactor', // Refactorización
        'test', // Tests
        'chore', // Mantenimiento
        'perf', // Rendimiento
        'ci', // CI/CD
        'build', // Build
        'revert', // Revertir
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-case': [0], // Desactivar validación de case en subject
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'scope-empty': [2, 'never'], // Requiere que siempre haya scope
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 200], // Permitir hasta 200 caracteres en el subject
  },
};
