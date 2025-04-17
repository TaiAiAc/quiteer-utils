# quiteer-utils

![npm version](https://img.shields.io/npm/v/@quiteer/color?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/color?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen?style=flat-square)

现代JavaScript/TypeScript工具库集合，提供类型安全的实用功能模块。

## 项目特性

✅ 模块化架构 - 按需安装独立功能包
✅ 完整类型定义 - 基于TypeScript开发
✅ 零依赖 - 纯净的运行时环境
✅ 严格测试 - 100%单元测试覆盖率
✅ 语义化版本 - 遵循SemVer规范

## 安装指南

### 全局安装（开发模式）

```bash
pnpm install
pnpm build
```

### 独立安装

```bash
# 颜色处理
npm install @quiteer/color

# 类型判断
npm install @quiteer/is

# 事件管理
npm install @quiteer/event

# 函数工具
npm install @quiteer/function

# HTTP请求
npm install @quiteer/fetch
```

## 功能包详情

### @quiteer/color

#### 功能特性

- 多格式支持：RGB/HEX/HSL/HSV转换
- 颜色操作：亮度调整 (±20%)、饱和度调节
- 混合模式：支持15+种混合算法
- 辅助功能：WCAG对比度计算

#### API示例

```typescript
// 颜色空间转换
color.rgbToHsl({ r: 255, g: 100, b: 50 })

// 对比度检查
color.checkContrast('#FF0000', '#000000') // 返回对比度比率

// 生成调色板
color.generatePalette(baseColor, { type: 'analogous' })
```

#### 使用示例

```typescript
import { adjustBrightness, blendColors, rgbToHex } from '@quiteer/color'

// 颜色格式转换
const rgb = { r: 255, g: 100, b: 50 }
const hex = rgbToHex(rgb) // '#FF6432'

// 调整亮度
const brighterColor = adjustBrightness(rgb, 20)

// 混合颜色
const color1 = { r: 255, g: 0, b: 0 }
const color2 = { r: 0, g: 0, b: 255 }
const blended = blendColors(color1, color2, 'screen')
```

### @quiteer/is

#### 功能特性

- 类型检测：精确识别40+种数据类型
- 环境判断：浏览器/Node.js环境检测
- 格式验证：IP地址、URL、邮箱格式校验

```typescript
is.primitive(null) // true
is.browserEnv() // 浏览器环境返回true
is.validEmail('user@example.com') // true
```

### @quiteer/event

#### 功能特性

- 多类型支持：自定义事件/DOM事件/Node事件
- 高级功能：事件节流、防抖、一次性监听
- 性能优化：事件池复用机制

```typescript
const emitter = new EventEmitter()
emitter.once('finish', callback)
emitter.throttle('resize', callback, 200ms)
```

### @quiteer/function

#### 功能特性

- 函数控制：重试机制、超时处理
- 性能优化：记忆化缓存、惰性加载
- 组合模式：管道/组合函数支持

```typescript
const fetchWithRetry = fn.retry(fetchApi, { times: 3 })
const memoized = fn.memoize(heavyCalculation)
```

### @quiteer/fetch

#### 功能特性

- 请求拦截：全局请求/响应拦截器
- 自动处理：JSON序列化、超时处理
- 高级功能：并发控制、缓存策略

```typescript
fetch.config({ baseURL: 'https://api.example.com' })
fetch.get('/users', { cacheTTL: 60 })
```

### @quiteer/time

#### 功能特性

- 时间格式化：支持20+种语言环境
- 日期计算：工作日计算、时区转换
- 性能测量：高精度计时器

```typescript
time.format(new Date(), 'YYYY-MM-DD HH:mm')
time.businessDaysBetween(startDate, endDate)
```

## 开发指南

### 工作流

```bash
# 安装依赖
pnpm install

# 启动监听模式
pnpm dev

# 运行测试
pnpm test

# 生成类型定义
pnpm build:types

# 生产环境构建
pnpm build
```

## 贡献规范

1. 提交信息遵循[Conventional Commits](https://www.conventionalcommits.org)
2. 重大变更需提交RFC提案
3. 新功能需提供：
   - 单元测试
   - 类型定义
   - 文档更新
   - 示例代码

## 质量保障

- ESLint：严格代码规范检查
- Jest：单元测试覆盖率100%
- TypeScript：严格模式类型检查
- Bundlephobia：包体积监控

## 许可证

[MIT](LICENSE) © 2024-PRESENT Quiteer Team

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License
