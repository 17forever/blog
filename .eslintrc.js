module.exports = {
  // "root": true,
  // parser: '@typescript-eslint/parser',
  // parserOptions: { project: './tsconfig.json' },
  // env: { es6: true },
  // ignorePatterns: ['node_modules', 'build', 'coverage', 'out', 'dist'],
  // plugins: ['import', 'eslint-comments', 'functional'],
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'plugin:@typescript-eslint/recommended',
    // 'eslint:recommended',
    // 'plugin:eslint-comments/recommended',
    // // "plugin:react/recommended",
    // 'plugin:import/typescript',
    // 'plugin:functional/lite',
    // 'prettier/@typescript-eslint',
    // "plugin:prettier/recommended"
  ],
  // globals: { BigInt: true, console: true, WebAssembly: true },
  rules: {
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // 'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    // 'eslint-comments/no-unused-disable': 'error',
    // 'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }],
    // 'sort-imports': ['error', { ignoreDeclarationSort: true, ignoreCase: true }],
  },
}
