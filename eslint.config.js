import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'build', 'coverage', '.env', '*.log', 'vite.config.ts', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
  },
  {
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
  ],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier,
    react,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'warn',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
