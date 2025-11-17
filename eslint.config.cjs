const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');
const pluginN = require('eslint-plugin-n');
const pluginPromise = require('eslint-plugin-promise');
const pluginImport = require('eslint-plugin-import');

module.exports = [
  { ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', 'CHANGELOG.md'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: globals.node,
    },
    plugins: {
      n: pluginN,
      promise: pluginPromise,
      import: pluginImport,
    },
    rules: {
      'n/no-unsupported-features/es-syntax': 'off',
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
      'no-nested-ternary': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true }],
      'max-params': ['warn', 3],
      'max-depth': ['warn', 3],
      'complexity': ['warn', 10],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
      'import/order': ['error', {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],
    },
  },
  prettier,
];