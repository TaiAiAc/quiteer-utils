/\*_ eslint-disable ts/consistent-type-definitions _/

# @quiteer/event

![npm version](https://img.shields.io/npm/v/@quiteer/event?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/event?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

现代化事件管理解决方案，支持浏览器与Node.js环境，提供严格类型检查的事件派发系统。

## 安装

```bash
npm install @quiteer/event
# 或
pnpm add @quiteer/event
```

## 核心特性

✅ 多环境支持 - 统一API适配浏览器/Node.js
✅ 类型安全 - 完备的TypeScript类型定义
✅ 性能优化 - 自动内存回收机制
✅ 混合事件 - 支持15+种节流/防抖模式

## 基础用法

```typescript
import { EventEmitter } from '@quiteer/event'

interface EventTypes {
  login: (userId: string) => void
  error: (code: number) => void
}

const emitter = new EventEmitter<EventTypes>()

// 监听事件
emitter.on('login', (userId) => {
  console.log(`用户登录: ${userId}`)
})

// 触发事件
emitter.emit('login', 'U_123456')

// 一次性监听
emitter.once('error', (code) => {
  console.error(`错误代码: ${code}`)
})
```

## 高级功能

### 节流控制

```typescript
// 200ms内只触发一次滚动事件
emitter.throttle('scroll', handler, 200)
```

### 混合模式

```typescript
// 防抖+最大触发限制
emitter.debounce('resize', handler, {
  wait: 300,
  maxTrigger: 5
})
```

### 自动清理

```typescript
// 自动移除所有监听
emitter.autoClean()
```

## 开发指南

```bash
# 运行测试
pnpm test

# 生成类型定义
pnpm build
```

## 贡献规范

- 提交前执行完整测试套件
- 新功能需提供类型测试
- API变更需更新文档示例

## 许可证

MIT © [Quiteer Team](https://github.com/quiteer)
