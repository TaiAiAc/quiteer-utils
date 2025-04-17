import { describe, expect, test } from '@jest/globals'
import { adjustSaturation, blendColors, getInvertColor, getRandomColor, rgbToHsl } from '../src'

describe('颜色工具函数测试', () => {
  describe('adjustSaturation - 饱和度调整', () => {
    test('基本饱和度调整', () => {
      const color = { r: 255, g: 0, b: 0, a: 1 }
      expect(adjustSaturation(color, 0)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(adjustSaturation(color, -50)).toEqual({ r: 191, g: 64, b: 64, a: 1 })
      expect(adjustSaturation(color, 20)).toEqual({ r: 255, g: 0, b: 0, a: 1 }) // 已经是最大饱和度
    })

    test('灰色调整饱和度', () => {
      const gray = { r: 128, g: 128, b: 128, a: 1 }
      expect(adjustSaturation(gray, 50)).toEqual({ r: 128, g: 128, b: 128, a: 1 }) // 灰色饱和度调整不影响颜色
    })

    test('带透明度的颜色调整', () => {
      const color = { r: 0, g: 128, b: 0, a: 0.5 }
      expect(adjustSaturation(color, 20)).toEqual({ r: 0, g: 128, b: 0, a: 0.5 })
    })
  })

  describe('blendColors - 颜色混合', () => {
    const color1 = { r: 255, g: 0, b: 0, a: 1 }
    const color2 = { r: 0, g: 255, b: 0, a: 0.5 }

    test('normal模式混合', () => {
      expect(blendColors(color1, color2)).toEqual({ r: 0, g: 255, b: 0, a: 0.75 })
      expect(blendColors({ r: 100, g: 100, b: 100, a: 1 }, { r: 200, g: 200, b: 200, a: 1 })).toEqual({ r: 200, g: 200, b: 200, a: 1 })
    })

    test('multiply模式混合', () => {
      expect(blendColors(color1, color2, 'multiply')).toEqual({ r: 0, g: 0, b: 0, a: 0.75 })
      expect(blendColors({ r: 128, g: 128, b: 128, a: 1 }, { r: 128, g: 128, b: 128, a: 1 }, 'multiply')).toEqual({ r: 64, g: 64, b: 64, a: 1 })
    })

    test('screen模式混合', () => {
      expect(blendColors(color1, color2, 'screen')).toEqual({ r: 255, g: 255, b: 0, a: 0.75 })
      expect(blendColors({ r: 128, g: 128, b: 128, a: 1 }, { r: 128, g: 128, b: 128, a: 1 }, 'screen')).toEqual({ r: 192, g: 192, b: 192, a: 1 })
    })

    test('overlay模式混合', () => {
      expect(blendColors(color1, color2, 'overlay')).toEqual({ r: 255, g: 0, b: 0, a: 0.75 })
      expect(blendColors({ r: 64, g: 64, b: 64, a: 1 }, { r: 192, g: 192, b: 192, a: 1 }, 'overlay')).toEqual({ r: 96, g: 96, b: 96, a: 1 })
    })

    test('darken模式混合', () => {
      expect(blendColors(color1, color2, 'darken')).toEqual({ r: 0, g: 0, b: 0, a: 0.75 })
      expect(blendColors({ r: 100, g: 100, b: 100, a: 1 }, { r: 200, g: 200, b: 200, a: 1 }, 'darken')).toEqual({ r: 100, g: 100, b: 100, a: 1 })
    })

    test('lighten模式混合', () => {
      expect(blendColors(color1, color2, 'lighten')).toEqual({ r: 255, g: 255, b: 0, a: 0.75 })
      expect(blendColors({ r: 100, g: 100, b: 100, a: 1 }, { r: 200, g: 200, b: 200, a: 1 }, 'lighten')).toEqual({ r: 200, g: 200, b: 200, a: 1 })
    })
  })

  describe('getInvertColor - 反色获取', () => {
    test('基本反色', () => {
      expect(getInvertColor({ r: 255, g: 0, b: 0, a: 1 })).toEqual({ r: 0, g: 255, b: 255, a: 1 })
      expect(getInvertColor({ r: 0, g: 255, b: 0, a: 1 })).toEqual({ r: 255, g: 0, b: 255, a: 1 })
    })

    test('灰色反色', () => {
      expect(getInvertColor({ r: 128, g: 128, b: 128, a: 1 })).toEqual({ r: 127, g: 127, b: 127, a: 1 })
    })

    test('带透明度的反色', () => {
      expect(getInvertColor({ r: 255, g: 0, b: 0, a: 0.5 })).toEqual({ r: 0, g: 255, b: 255, a: 0.5 })
    })
  })

  describe('getRandomColor - 随机颜色生成', () => {
    test('默认参数生成', () => {
      const color = getRandomColor()
      expect(color.r).toBeGreaterThanOrEqual(0)
      expect(color.r).toBeLessThanOrEqual(255)
      expect(color.g).toBeGreaterThanOrEqual(0)
      expect(color.g).toBeLessThanOrEqual(255)
      expect(color.b).toBeGreaterThanOrEqual(0)
      expect(color.b).toBeLessThanOrEqual(255)
      expect(color.a).toBe(1)
    })

    test('自定义参数生成', () => {
      const color = getRandomColor({
        minBrightness: 50,
        maxBrightness: 60,
        saturation: 80,
      })
      const hsl = rgbToHsl(color)
      expect(hsl.l).toBeGreaterThanOrEqual(50)
      expect(hsl.l).toBeLessThanOrEqual(60)
      expect(hsl.s).toBe(80)
    })
  })
})
