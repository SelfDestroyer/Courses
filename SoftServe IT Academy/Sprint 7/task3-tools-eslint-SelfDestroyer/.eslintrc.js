module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'space-infix-ops': ['error', {'int32Hint': false}],
    'no-inline-comments': ['error', {'ignorePattern': 'webpackChunkName:\\s.+'}],
    'no-console': ['error', {allow: ['warn', 'error']}],
    'curly': ['error', 'all'],
  },
};
