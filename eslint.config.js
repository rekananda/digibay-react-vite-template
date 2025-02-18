import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier';
import stylelint from 'eslint-plugin-stylelint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, 'plugin:prettier/recommended', 'plugin:stylelint/recommended', ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      stylelint
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react/no-unknown-property': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'max-lines': ['warn', { 'max': 300 }],
    },
  },
)
