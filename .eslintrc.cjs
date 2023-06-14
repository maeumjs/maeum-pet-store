module.exports = {
  env: {
    es6: true,
    node: true,
  },
  ignorePatterns: ['__test__/*', '__tests__/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    // ----------------------------------------------------------------------------------------------------------
    // eslint
    // ----------------------------------------------------------------------------------------------------------
    'max-len': [
      'error',
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        code: 120,
      },
    ],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration:not([const=true])',
        message: "Don't declare non-const enums",
      },
    ],
    // ----------------------------------------------------------------------------------------------------------
    // @typescript-eslint
    // ----------------------------------------------------------------------------------------------------------
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]+',
          match: true,
        },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]+',
          match: true,
        },
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_.+$',
        argsIgnorePattern: '^_.+$',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    // ----------------------------------------------------------------------------------------------------------
    // eslint-plugin-import
    // ----------------------------------------------------------------------------------------------------------
    'import/prefer-default-export': ['off'],
    'import/no-default-export': ['error'],
  },
  overrides: [
    // script
    {
      files: ['scripts/**/*.ts', 'scripts/**/*.cjs'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        'no-console': ['off'],
      },
    },
    {
      files: ['src/listen.ts'],
      rules: {
        'no-console': ['off'],
      },
    },
    {
      files: ['src/configs/DotenvContainer.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': ['off'],
      },
    },
    // bootstrap code
    {
      files: ['src/configs/config.ts', 'src/tools/i18n/i18n.ts', 'src/loggers/bootstrap.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-argument': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
      },
    },
    {
      files: ['**/CE_*.ts'],
      rules: {
        '@typescript-eslint/no-redeclare': ['off'],
        '@typescript-eslint/naming-convention': ['off'],
      },
    },
    {
      files: ['src/handlers/**/*.ts'],
      rules: {
        'import/prefer-default-export': ['error', { target: 'single' }],
        'import/no-default-export': ['off'],
      },
    },
    {
      files: ['src/server/ServerContainer.ts'],
      rules: {
        '@typescript-eslint/no-floating-promises': ['off'],
      },
    },
    {
      files: ['**/__tests__/*.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        'no-console': ['off'],
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code,
        // like `@types/unist`
        alwaysTryTypes: true,
        project: 'tsconfig.eslint.json',
      },
    },
  },
};
