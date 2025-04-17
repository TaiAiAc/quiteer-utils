# @quiteer/fetch

![npm version](https://img.shields.io/npm/v/@quiteer/fetch?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/fetch?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

现代化HTTP请求库，提供智能缓存策略和类型安全的API设计。

## 安装

```bash
npm install @quiteer/fetch
# 或
pnpm add @quiteer/fetch
```

## 核心特性

✅ 全局拦截器 - 请求/响应预处理
✅ 智能缓存 - TTL控制/ETag支持
✅ 类型安全 - 自动生成TS类型定义
✅ 高级功能 - 并发控制/自动重试

## 基础用法

```typescript
import fetch from '@quiteer/fetch'

// 全局配置
fetch.config({
  baseURL: 'https://api.example.com',
  timeout: 5000
})

// 类型化请求
interface User {
  id: string
  name: string
}

const { data } = await fetch.get<User[]>('/users')
```

## 高级功能

### 请求拦截

```typescript
// 添加认证头
fetch.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})
```

### 缓存策略

```typescript
// 带缓存的请求
const { data } = await fetch.get('/posts', {
  cacheTTL: 60, // 60秒缓存
  staleWhileRevalidate: 300 // 后台刷新窗口
})
```

### 并发控制

```typescript
// 最大5个并发
const controlledFetch = fetch.create({
  maxConcurrent: 5
})
```

## 开发指南

```bash
# 启动Mock服务器
pnpm mock

# 运行性能测试
pnpm test:perf
```

## 贡献要求

- 新增功能需提供OpenAPI规范
- 缓存策略需有LRU实现
- 文档示例需同步单元测试

## 许可证

MIT © [Quiteer Team](https://github.com/quiteer)
