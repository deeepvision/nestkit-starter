//
// @pkg 📦 DeepVision ESLint Config [NestJS]
// @version 📍 1.0.0
// @author 🐳 DeepVision Team <code@deepvision.team>
//
// Documentation reference: https://eslint.org/docs/user-guide/configuring/
// ESLint versions: https://eslint.org/blog/
//

const path = require('node:path');

module.exports = {
  root: true,
  extends: ['plugin:@deepvision/recommended-node'],
  ignorePatterns: ['src/i18n/types.ts'],
  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
  },
  rules: {
    'node/no-extraneous-import': 'off',
  },
  overrides: [
    {
      files: ['src/migrations/**/*.ts'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
