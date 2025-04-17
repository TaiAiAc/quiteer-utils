/* eslint-disable jsdoc/check-param-names */
import type { HEX, HSL, RGB } from './types'

/**
 * RGB转HSL
 * @param rgb RGB颜色对象
 * @returns HSL颜色对象
 */
export function rgbToHsl({ r, g, b, a = 1 }: RGB): HSL {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
    throw new Error('无效的RGB值')
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  }
}

/**
 * HSL转RGB
 * @param hsl HSL颜色对象
 * @returns RGB颜色对象
 */
export function hslToRgb({ h, s, l, a = 1 }: HSL): RGB {
  if (h < 0 || h >= 360 || s < 0 || s > 100 || l < 0 || l > 100)
    throw new Error('无效的HSL值')
  h /= 360
  s /= 100
  l /= 100

  let r: number
  let g: number
  let b: number

  if (s === 0) {
    r = g = b = l
  }
  else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0)
        t += 1
      if (t > 1)
        t -= 1
      if (t < 1 / 6)
        return p + (q - p) * 6 * t
      if (t < 1 / 2)
        return q
      if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  }
}

/**
 * RGB转HEX
 * @param rgb RGB颜色对象
 * @returns 十六进制颜色字符串
 */
export function rgbToHex({ r, g, b, a = 1 }: RGB): HEX {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  return a === 1 ? hex : `${hex}${toHex(Math.round(a * 255))}`
}

/**
 * HEX转RGB
 * @param hex 十六进制颜色字符串
 * @returns RGB颜色对象
 */
export function hexToRgb(hex: HEX): RGB {
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b, a) => r + r + g + g + b + b + (a ? a + a : ''))
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(fullHex)
  if (!result)
    throw new Error('Invalid hex color')

  const [, r, g, b, a] = result
  return {
    r: Number.parseInt(r, 16),
    g: Number.parseInt(g, 16),
    b: Number.parseInt(b, 16),
    a: a ? Number.parseInt(a, 16) / 255 : 1,
  }
}
