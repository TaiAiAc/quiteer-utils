/**
 * RGB颜色对象
 */
interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
/**
 * HSL颜色对象
 */
interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
/**
 * 十六进制颜色字符串
 */
type HEX = string;
/**
 * 支持的颜色格式
 */
type ColorFormat = 'rgb' | 'hsl' | 'hex';
/**
 * 颜色混合模式
 */
type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';

/**
 * RGB转HSL
 * @param rgb RGB颜色对象
 * @returns HSL颜色对象
 */
declare function rgbToHsl({ r, g, b, a }: RGB): HSL;
/**
 * HSL转RGB
 * @param hsl HSL颜色对象
 * @returns RGB颜色对象
 */
declare function hslToRgb({ h, s, l, a }: HSL): RGB;
/**
 * RGB转HEX
 * @param rgb RGB颜色对象
 * @returns 十六进制颜色字符串
 */
declare function rgbToHex({ r, g, b, a }: RGB): HEX;
/**
 * HEX转RGB
 * @param hex 十六进制颜色字符串
 * @returns RGB颜色对象
 */
declare function hexToRgb(hex: HEX): RGB;

/**
 * 调整颜色亮度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
declare function adjustBrightness(rgb: RGB, amount: number): RGB;
/**
 * 调整颜色饱和度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
declare function adjustSaturation(rgb: RGB, amount: number): RGB;
/**
 * 混合两种颜色
 * @param color1 第一个RGB颜色对象
 * @param color2 第二个RGB颜色对象
 * @param mode 混合模式
 * @returns 混合后的RGB颜色对象
 */
declare function blendColors(color1: RGB, color2: RGB, mode?: BlendMode): RGB;
/**
 * 获取互补色
 * @param rgb RGB颜色对象
 * @returns 互补色的RGB颜色对象
 */
declare function getComplementaryColor(rgb: RGB): RGB;
/**
 * 获取颜色的反色
 * @param rgb RGB颜色对象
 * @returns 反色的RGB颜色对象
 */
declare function getInvertColor(rgb: RGB): RGB;
/**
 * 获取随机颜色
 * @param options 选项对象
 * @returns RGB颜色对象
 */
declare function getRandomColor(options?: {
    minBrightness?: number;
    maxBrightness?: number;
    saturation?: number;
}): RGB;

export { adjustBrightness, adjustSaturation, blendColors, getComplementaryColor, getInvertColor, getRandomColor, hexToRgb, hslToRgb, rgbToHex, rgbToHsl };
export type { BlendMode, ColorFormat, HEX, HSL, RGB };
