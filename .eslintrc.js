module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    assetUrl: true,
    buildNumber: true,
    HTMLElement: true,
    opr: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
