module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    eqeqeq: 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    jest: true,
  },
};
