// This is a reusable configuration file copied from https://github.com/actions/reusable-workflows/tree/main/reusable-configurations. Please don't make changes to this file as it's the subject of an automatic update.
import eslint from '@eslint/js';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginN from 'eslint-plugin-n';

export default [
  {
    ignores: ['dist/**', 'lib/**', 'node_modules/**']
  },
  eslint.configs.recommended,
  ...tseslintPlugin.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslintPlugin,
      n: pluginN
    },
    languageOptions: {
      parser: tsParser
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description'
        }
      ],
      'no-console': 'error',
      yoda: 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all'
        }
      ],
      'no-control-regex': 'off',
      'no-constant-condition': ['error', {checkLoops: false}],
      'n/no-extraneous-import': 'error'
    }
  }
];
