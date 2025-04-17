/**
 * RGB颜色对象
 */
export interface RGB {
  r: number
  g: number
  b: number
  a?: number
}

/**
 * HSL颜色对象
 */
export interface HSL {
  h: number
  s: number
  l: number
  a?: number
}

/**
 * 十六进制颜色字符串
 */
export type HEX = string

/**
 * 支持的颜色格式
 */
export type ColorFormat = 'rgb' | 'hsl' | 'hex'

/**
 * 颜色混合模式
 */
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
