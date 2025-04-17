# @quiteer/function

![npm version](https://img.shields.io/npm/v/@quiteer/function?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/function?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

现代化函数工具库，提供安全的函数控制和组合能力。

## 安装

```bash
npm install @quiteer/function
# 或
pnpm add @quiteer/function
```

## 核心特性

✅ 流程控制 - 重试/超时/并发限制
✅ 性能优化 - 记忆化/惰性加载
✅ 函数组合 - 管道/流程控制
✅ 类型安全 - 完整的TS类型推断

## 基础用法

```typescript
import fn from '@quiteer/function'

// 重试机制
const fetchWithRetry = fn.retry(fetchApi, { times: 3 })

// 记忆化函数
const memoized = fn.memoize(expensiveCalculation)

// 管道组合
const process = fn.pipe(
  cleanInput,
  validate,
  encryptData
)
```

## 高级功能

### 超时控制

```typescript
// 5秒超时限制
const safeFetch = fn.timeout(fetchApi, 5000)
```

### 并发管理

```typescript
// 最多3个并发
const controlled = fn.concurrency(apiCall, 3)
```

### 惰性加载

```typescript
const lazyModule = fn.lazy(() => import('./heavy-module'))
```

## 开发指南

```bash
# 运行类型检查
pnpm typecheck

# 执行性能测试
pnpm test:perf
```

## 贡献要求

- 新功能需提供基准测试
- 算法优化需有性能对比数据
- API变更需更新类型定义

## 许可证

MIT © [Quiteer Team](https://github.com/quiteer)
