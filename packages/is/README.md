# @quiteer/is

![npm version](https://img.shields.io/npm/v/@quiteer/is?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/is?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

现代化类型判断库，提供精确的类型检测和环境判断能力。

## 安装
```bash
npm install @quiteer/is
# 或
pnpm add @quiteer/is
```

## 核心特性

✅ 精确类型检测 - 支持40+种数据类型判断
✅ 环境判断 - 识别浏览器/Node.js/Deno等运行时
✅ 格式验证 - 邮箱/IP/URL等常见格式校验
✅ 类型守卫 - 完善的TypeScript类型推断

## 基础用法
```typescript
import is from '@quiteer/is';

// 类型检测
is.array(new Set()); // false
is.iterable([]); // true

// 环境判断
is.browser(); // 浏览器环境返回true
is.node(); // Node.js环境返回true

// 格式校验
is.email('user@example.com'); // true
is.ipv4('192.168.1.1'); // true
```

## 高级功能

### 类型守卫
```typescript
const data: unknown = getData();

if (is.array<string>(data)) {
  // 自动推断为string数组
  data.map(s => s.toUpperCase())
}
```

### 运行时特征检测
```typescript
// 检测ES模块环境
is.esm();

// 检测SSR环境
is.ssr();
```

### 复合校验
```typescript
// 验证强密码格式
is.strongPassword('Passw0rd!', {
  minLength: 8,
  requireSymbol: true
});
```

## 开发指南
```bash
# 运行测试
pnpm test

# 生成类型定义
pnpm build
```

## 贡献要求
- 新增类型检测需提供类型测试
- 环境判断需覆盖主流运行时
- 文档示例需同步单元测试

## 许可证
MIT © [Quiteer Team](https://github.com/quiteer)
