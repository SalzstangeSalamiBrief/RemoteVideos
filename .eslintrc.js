module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'airbnb-base',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 2],
    'linebreak-style': [0, 'error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-param-reassign': [2, { props: false }],
    'no-shadow': ['error', { allow: ['state'] }],
    'max-len': 'off',
    'class-methods-use-this': 'off',
    // 'space-after-function-name': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'consistent-return': [0],
  },
};
