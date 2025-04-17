import type { BlendMode, HSL, RGB } from './types'
import { hslToRgb, rgbToHsl } from './convert'

/**
 * 调整颜色亮度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
export function adjustBrightness(rgb: RGB, amount: number): RGB {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error('无效的RGB值')
  if (amount < 0 || amount > 100)
    throw new Error('无效的亮度调整值')
  const hsl = rgbToHsl(rgb)
  hsl.l = Math.max(0, Math.min(100, amount))
  const result = hslToRgb(hsl)
  result.a = rgb.a !== undefined ? rgb.a : 1
  return result
}

/**
 * 调整颜色饱和度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
export function adjustSaturation(rgb: RGB, amount: number): RGB {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error('无效的RGB值')
  if (amount < -100 || amount > 100)
    throw new Error('无效的饱和度调整值')

  const hsl = rgbToHsl(rgb)

  // 对于灰色，保持其饱和度为0
  if (rgb.r === rgb.g && rgb.g === rgb.b) {
    hsl.s = 0
  }
  else {
    // 调整饱和度
    hsl.s = Math.max(0, Math.min(100, hsl.s + amount))
  }

  const result = hslToRgb(hsl)
  result.a = rgb.a !== undefined ? rgb.a : 1
  return result
}

/**
 * 混合两种颜色
 * @param color1 第一个RGB颜色对象
 * @param color2 第二个RGB颜色对象
 * @param mode 混合模式
 * @returns 混合后的RGB颜色对象
 */
export function blendColors(color1: RGB, color2: RGB, mode: BlendMode = 'normal'): RGB {
  const blend = {
    normal: (a: number, b: number) => b,
    multiply: (a: number, b: number) => (a * b) / 255,
    screen: (a: number, b: number) => 255 - ((255 - a) * (255 - b)) / 255,
    overlay: (a: number, b: number) => {
      if (a < 128) {
        return Math.round((2 * a * b) / 255)
      }
      else {
        return Math.round(255 - 2 * (255 - a) * (255 - b) / 255)
      }
    },
    darken: (a: number, b: number) => Math.min(a, b),
    lighten: (a: number, b: number) => Math.max(a, b),
  }

  return {
    r: Math.round(blend[mode](color1.r, color2.r)),
    g: Math.round(blend[mode](color1.g, color2.g)),
    b: Math.round(blend[mode](color1.b, color2.b)),
    a: color1.a !== undefined && color2.a !== undefined
      ? (color1.a + color2.a) / 2
      : 1,
  }
}

/**
 * 获取互补色
 * @param rgb RGB颜色对象
 * @returns 互补色的RGB颜色对象
 */
export function getComplementaryColor(rgb: RGB): RGB {
  const hsl = rgbToHsl(rgb)
  hsl.h = (hsl.h + 180) % 360
  hsl.a = rgb.a !== undefined ? rgb.a : 1
  return hslToRgb(hsl)
}

/**
 * 获取颜色的反色
 * @param rgb RGB颜色对象
 * @returns 反色的RGB颜色对象
 */
export function getInvertColor(rgb: RGB): RGB {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a,
  }
}

/**
 * 获取随机颜色
 * @param options 选项对象
 * @returns RGB颜色对象
 */
export function getRandomColor(options: {
  minBrightness?: number
  maxBrightness?: number
  saturation?: number
} = {}): RGB {
  const {
    minBrightness = 20,
    maxBrightness = 80,
    saturation = 70,
  } = options

  const hsl: HSL = {
    h: Math.floor(Math.random() * 360),
    s: saturation,
    l: Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness),
  }

  return hslToRgb(hsl)
}
