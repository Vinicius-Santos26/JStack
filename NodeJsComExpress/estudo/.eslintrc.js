module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'eol-last': 'off',
    'require-jsdoc': 'off',
    'camelcase': 'off',
    'new-cap': 'off',
  },
};
