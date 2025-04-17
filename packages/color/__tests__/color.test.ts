import { describe, expect, test } from '@jest/globals'
import { adjustBrightness, getComplementaryColor, hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from '../src'

describe('颜色转换', () => {
  describe('RGB/HSL互转', () => {
    test('RGB转HSL基础转换', () => {
      expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(rgbToHsl({ r: 0, g: 128, b: 0 })).toEqual({ h: 120, s: 100, l: 25, a: 1 })
      expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50, a: 1 })
    })

    test('HSL转RGB基础转换', () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(hslToRgb({ h: 120, s: 100, l: 25 })).toEqual({ r: 0, g: 128, b: 0, a: 1 })
      expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255, a: 1 })
    })

    test('HSL边界值转换', () => {
      // 零饱和度
      expect(hslToRgb({ h: 0, s: 0, l: 50 })).toEqual({ r: 128, g: 128, b: 128, a: 1 })
      // 最大亮度
      expect(hslToRgb({ h: 0, s: 100, l: 100 })).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    })

    test('异常输入处理', () => {
      // RGB异常
      expect(() => rgbToHsl({ r: 256, g: 0, b: 0 })).toThrow('无效的RGB值')
      expect(() => rgbToHsl({ r: -1, g: 200, b: 100 })).toThrow('无效的RGB值')
      // HSL异常
      expect(() => hslToRgb({ h: 360, s: 0, l: 0 })).toThrow('无效的HSL值')
      expect(() => hslToRgb({ h: 0, s: 101, l: 50 })).toThrow('无效的HSL值')
    })
  })

  describe('RGB/HEX互转', () => {
    test('RGB转HEX基础转换', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#ff0000')
      expect(rgbToHex({ r: 0, g: 128, b: 0 })).toBe('#008000')
      expect(rgbToHex({ r: 0, g: 0, b: 255, a: 0.5 })).toBe('#0000ff80')
    })

    test('HEX转RGB基础转换', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(hexToRgb('#008000')).toEqual({ r: 0, g: 128, b: 0, a: 1 })
      expect(hexToRgb('#0000ff80')).toMatchObject({ r: 0, g: 0, b: 255, a: expect.closeTo(0.5, 2) })
    })

    test('HEX简写格式处理', () => {
      expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(hexToRgb('#0f08')).toMatchObject({ r: 0, g: 255, b: 0, a: expect.closeTo(0.533, 3) })
    })

    test('HEX异常输入处理', () => {
      expect(() => hexToRgb('invalid')).toThrow('Invalid hex color')
      expect(() => hexToRgb('#12345')).toThrow('Invalid hex color')
      expect(() => hexToRgb('#ff0000ff0')).toThrow('Invalid hex color')
    })
  })
})

describe('颜色工具', () => {
  test('互补色计算', () => {
    expect(getComplementaryColor({ r: 255, g: 0, b: 0 })).toEqual({ r: 0, g: 255, b: 255, a: 1 })
    expect(getComplementaryColor({ r: 0, g: 128, b: 0 })).toEqual({ r: 128, g: 0, b: 127, a: 1 })
  })

  test('亮度调整边界值', () => {
    expect(adjustBrightness({ r: 255, g: 0, b: 0 }, 0)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(adjustBrightness({ r: 255, g: 0, b: 0 }, 100)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(() => adjustBrightness({ r: 256, g: 0, b: 0 }, 101)).toThrow('无效的RGB值')
  })
})
