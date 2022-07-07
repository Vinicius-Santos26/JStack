module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'eol-last': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
  },
};