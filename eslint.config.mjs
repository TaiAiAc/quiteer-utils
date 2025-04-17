import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
  },
  {
    rules: {
      // 修正后的规则配置
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // 禁用基础规则
      'no-unused-vars': 'off',
    },
  },
)
