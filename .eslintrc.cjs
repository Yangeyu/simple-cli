module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    './autoimportlintrc.cjs',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'off'    -> 0 关闭规则;
    // 'warn'   -> 1 开启警告规则;
    // 'error'  -> 2 开启错误规则;

    /* **************************** */
    /* 符号规则                      */
    /* **************************** */
    // 强制使用单引号
    'no-empty-function': 0,
    'quotes': [2, 'single', {
      // 允许字符串使用单引号或者双引号，只要字符串中包含了一个其他引号，否则需要转义
      'avoidEscape': true,
      // 允许字符串使用模板字符串
      'allowTemplateLiterals': true,
    }],
    // 强制所有控制语句使用一致的括号风格
    'curly': [2, 'multi-line'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    // 强制在多行对象/数组中尾随逗号
    'comma-dangle': [2, {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'ignore',
    }],
    // 强制换行时逗号在行尾
    'comma-style': [2, 'last'],
    // 强制语句尾随分号
    'semi': [0, 'always'],
    // 箭头函数参数括号按需
    'arrow-parens': [2, 'as-needed'],

    /* **************************** */
    /* 空格规则                      */
    /* **************************** */
    // 强制2个空格作为缩进
    'indent': [2, 2, { 'SwitchCase': 1, 'VariableDeclarator': 'first' }],
    // 强制函数花括号内有间距
    'block-spacing': [2, 'always'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': [2, 'always'],
    // 强制在function的左括号之前不适用空格
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    // 强制在注释// 或/*使用一致的空格
    'spaced-comment': [0, 'always'],
    // 强制逗号后要有空格
    'comma-spacing': [2, { 'before': false, 'after': true }],
    // 强制对象中左右空格
    'object-curly-spacing': [2, 'always'],
    // 强制数组中左右禁止空格
    'array-bracket-spacing': [2, 'never'],
    // 允许在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 0,
    // 强制箭头函数箭头左右空格
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    // 强制操作符两边需要空格
    'space-infix-ops': 2,
    // 强制对象字面量属性中冒号后空格
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
    // 强制关键字前后需要空格
    'keyword-spacing': [2, {
      'before': true,
      'after': true,
    }],

    /* **************************** */
    /* 语法规则                      */
    /* **************************** */
    // 禁止出现重复的case标签
    'no-duplicate-case': 2,
    // 禁止在return、throw、continue、break语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止function定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止case语句落空
    'no-fallthrough': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止出现未使用的变量
    'no-unused-vars': [2, { 'varsIgnorePattern': '.*', 'args': 'none' }],
    // 禁用不必要嵌套块
    'no-lone-blocks': 2,
    // 强制禁用var
    'no-var': 2,
    // 强制禁止出现空函数
    // 'no-empty-function': 2,
    // 禁止不必要的括号
    'no-extra-parens': [2, 'functions'],
    // 强制使用 ===和 !==
    'eqeqeq': [2, 'always'],

    /* **************************** */
    /* TS规则                       */
    /* **************************** */
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': [2, { varsIgnorePattern: '.*', args: 'none' }],

    /* **************************** */
    /* Vue(Eslint-plugin-vue)规则   */
    /* **************************** */
    'vue/no-mutating-props': 0,
    'vue/one-component-per-file': 0,
    'vue/no-multiple-template-root': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': [0, {
      'singleline': {
        'max': 3,
      },
    }],
    'vue/v-on-event-hyphenation': [1, 'always', {
      'autofix': true,
    }],
    'vue/attribute-hyphenation': [1, 'always'],
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': [2, 2],
    'vue/require-default-prop': 0,
    'vue/no-v-model-argument': 0,
    'vue/multi-word-component-names': 0,

  },
};
