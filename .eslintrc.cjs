module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    '@nuxtjs/eslint-config-typescript'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    ecmaVersion: 2022,
    extraFileExtensions: ['.vue']
  },
  rules: {
    'class-methods-use-this': ['off'],
    'lines-between-class-members': ['off'],
    'vue/no-v-html': 'off',
    'vue/max-len': ['error', {
      code: 150,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreStrings: true,
      ignoreHTMLTextContents: true,
      ignoreHTMLAttributeValues: true
    }],
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/component-name-in-template-casing': 'off',
    'vue/no-deprecated-router-link-tag-prop': ['error', {
      components: ['RouterLink']
    }],
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'default', 'error', 'blank', '[slug]', 'Pagination']
    }],
    'max-len': 'off',
    'radix': ['error', 'as-needed'],
    'template-curly-spacing': 'off',
    'indent': 'off',
    'no-plusplus': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? ['error'] : 'off',
    'comma-dangle': ['error', 'never'],
    'semi': ['error', 'never'],
    'quote-props': ['error', 'consistent-as-needed'],
    'import/no-unresolved': 'off',
    'space-before-function-paren': ['error', 'always'],
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error', { allow: ['state'] }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'no-bitwise': ['error', { int32Hint: true }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'acc', // for reduce accumulators
        'state',
        'el',
        'Vue',
        'vue',
        'query',
        'config'
      ]
    }],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'import/prefer-default-export': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowTypedFunctionExpressions: false }],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/space-before-function-paren': ['error', 'always'],
    '@typescript-eslint/no-type-alias': ['warn', {
      allowAliases: 'in-unions'
    }],
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true,
        variableDeclaration: false,
        parameter: true,
        objectDestructuring: false,
        memberVariableDeclaration: true,
        propertyDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ]
  },
  ignorePatterns: [
    'tailwind.config.js'
  ]
}
