module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  extends: ['airbnb-base', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
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
    'space-before-function-paren': ['error', 'always']
  }
}
