module.exports = {
  extends: ["stylelint-config-standard-scss"],
  overrides: [
    // 扫描.vue/html文件中的<style>标签内的样式
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    indentation: 2,
    // 是否不允许空内容
    'no-empty-source': null,
    'max-empty-lines': 1,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment']
      }
    ],
    // "rule-empty-line-before": "always",
    // --  Deprecated 要求在块开启括号之前始终使用空格
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'comment-whitespace-inside': 'always',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'declaration-block-single-line-max-declarations': 1,
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block']
      }
    ],
    'function-name-case': 'lower',
    'length-zero-no-unit': true,
    // 禁止行末尾出现空格
    'no-eol-whitespace': true,
    // 要求文件末尾必须有一个空行
    'no-missing-end-of-source-newline': true,
    // 要求在小数之前使用零
    'number-leading-zero': 'always',
    // 禁止在数字中出现尾随的零
    'number-no-trailing-zeros': true,

    // ------------------ Deprecated  Start -----------------
    // 要求选择器属性方括号内部不使用空格
    'selector-attribute-brackets-space-inside': 'never',
    // 要求选择器属性操作符之后不使用空格
    'selector-attribute-operator-space-after': 'never',
    // 要求选择器属性操作符之前不使用空格
    'selector-attribute-operator-space-before': 'never',
    // 要求选择器属性操作符之后不使用空格
    'selector-combinator-space-after': 'always',
    // 要求选择器属性操作符之前不使用空格
    'selector-combinator-space-before': 'always',
    // 后代选择器（空格）只有一个
    'selector-descendant-combinator-no-non-space': true,
    // 要求选择器列表中逗号之前不使用空格。
    'selector-list-comma-space-before': 'never',
    // 限制选择器中连续空行的数量
    'selector-max-empty-lines': 0,
    // 强制伪类选择器使用小写字母
    'selector-pseudo-class-case': 'lower',
    // 要求伪类选择器括号内部不使用空格
    'selector-pseudo-class-parentheses-space-inside': 'never',
    // 强制伪元素选择器使用小写字母
    'selector-pseudo-element-case': 'lower',
    // ------------------ Deprecated  end -----------------

    // 强制伪元素选择器使用双冒号（::）符号
    'selector-pseudo-element-colon-notation': 'double',
    // 强制选择器类型使用小写字母
    'selector-type-case': 'lower',
    // 强制单位使用小写字母
    'unit-case': 'lower',
    // 强制值关键字使用小写字母
    'value-keyword-case': 'lower',
  }
}
