# @quiteer/time

## 安装

```bash
pnpm add @quiteer/time
```

## 核心功能

### 时间获取

- `getCurrentTime()` 获取当前时间对象
- `getCurrentTimestamp()` 获取当前时间戳
- `getCurrentWeekDay()` 获取当前星期数（中文）

### 时间格式化

支持自定义格式：

```typescript
// 默认格式
const timeStr = getCurrentTimeString() // "2024-01-15 09:05:03"

// 自定义格式
getCurrentTimeString('YYYY/MM/DD HH时mm分ss秒') // "2024/01/15 09时05分03秒"

// 月末边界处理
const lastDay = new Date('2024-02-29T23:59:59')
getCurrentTimeString('YYYY-MM-DD') // "2024-02-29"
```

## 类型安全

- 所有时间参数接受 Date 对象或数字时间戳
- 返回值类型明确标注（string | number | Date）

## 测试覆盖率

![测试覆盖率](https://img.shields.io/badge/coverage-98%25-success)

## 开发指南

1. 新增功能需提供对应测试用例
2. 时区处理需通过`Intl.DateTimeFormat`实现
3. 文档示例需与单元测试保持同步

## 示例场景

```typescript
// 获取当前星期
const weekday = getCurrentWeekDay() // "周一"

// 跨时区格式化
const options = {
  timeZone: 'America/New_York',
  hour12: true
}
const nyTime = getCurrentTimeString('YYYY-MM-DD hh:mm:ss a', options) // "2024-01-14 08:05:03 PM"
```
