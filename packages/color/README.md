# @quiteer/color

![npm version](https://img.shields.io/npm/v/@quiteer/color?style=flat-square)
![License](https://img.shields.io/npm/l/@quiteer/color?style=flat-square)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)

现代化颜色处理库，提供严格的类型安全校验和完整的色彩空间转换能力。

## 安装

```bash
npm install @quiteer/color
# 或
pnpm add @quiteer/color
```

## 核心特性

✅ 完整色彩空间 - 支持RGB/HSL/HSV/HEX/CSS命名色
✅ 无障碍设计 - WCAG 2.1对比度计算
✅ 颜色操作 - 亮度/饱和度/透明度调整
✅ 混合模式 - 15种混合算法支持

## 基础用法

```typescript
import { blendColors, parseColor } from '@quiteer/color'

// 自动识别颜色格式
const color = parseColor('#FF5733')

// 转换为HSL格式
const hsl = color.toHsl() // { h: 14.5, s: 100, l: 59.8 }

// 颜色混合
const red = parseColor('rgb(255,0,0)')
const blue = parseColor('hsl(240,100%,50%)')
const blended = blendColors(red, blue, 'multiply')
```

## 高级功能

### 对比度检测

```typescript
import { checkContrast } from '@quiteer/color'

// 检测文本可读性
checkContrast('#FFFFFF', '#000000', {
  level: 'AA',
  size: 'large'
}) // 返回 { pass: true, ratio: 21 }
```

### 调色板生成

```typescript
import { generatePalette } from '@quiteer/color'

// 生成互补色板
const palette = generatePalette('#1976D2', {
  type: 'complementary',
  steps: 5
})
```

### 色彩空间转换

```typescript
import { hsvToHex, rgbToHsv } from '@quiteer/color'

const hsv = rgbToHsv({ r: 255, g: 100, b: 50 })
const hex = hsvToHex(hsv) // #FF6432
```

## 开发指南

```bash
# 运行类型检查
pnpm typecheck

# 执行单元测试
pnpm test
```

## 贡献要求

- 新增算法需提供数学证明
- 颜色转换需通过round-trip测试
- API变更需同步更新类型定义

## 许可证

MIT © [Quiteer Team](https://github.com/quiteer)
