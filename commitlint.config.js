module.exports = {
  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  // headr: <type>(<scope>): <subject>
  rules: {
    // 内容以空行开始
    'body-leading-blank': [2, 'always'],
    // 结尾以空行开始
    'footer-leading-blank': [2, 'always'],
    // 标题最大长度 72 个字符
    'header-max-length': [2, 'always', 72],

    // ------------ scope 配置 ----------------
    // Scope 永远小写
    // 'scope-case': [2, 'always', 'lower-case'],
    // Scope 不为空
    // 'scope-empty': [2, 'never'],
    // Scope 最小长度
    // 'scope-min-length': [2, 'always', 2],
    // Scope 范围
    // 'scope-enum': [2, 'always', ['chore']],

    // ------------ subject 配置 ----------------
    // 不允许标题空着
    'subject-empty': [2, 'never'],
    // 不允许使用句号
    'subject-full-stop': [2, 'never'],

    // ------------ type 配置 ----------------
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // type 可选项
    'type-enum': [2, 'always',
      [
        'feat',     // 增加新功能
        'fix',      // 修复问题/BUG
        'docs',     // 文档/注释
        'style',    // 代码风格相关无影响运行结果的
        'types',    // 接口声明相关
        'refactor', // 重构
        'test',     // 测试相关
        'build',    // 构建配置相关
        'revert',   // 回滚某个更早之前的提交
        'perf',     // 优化/性能提升
        'merge',    // 分支合并
        'chore',    // 依赖更新/脚手架配置修改等
        'ci',       // 持续集成
      ],
    ],
  },
};
