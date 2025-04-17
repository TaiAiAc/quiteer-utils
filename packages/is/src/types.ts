/**
 * 基本类型检查函数
 */

/**
 * 检查值是否为undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

/**
 * 检查值是否为null
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 检查值是否为空值（null或undefined）
 */
export function isNullish(value: unknown): value is null | undefined {
  return isNull(value) || isUndefined(value)
}

/**
 * 检查值是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 检查值是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 检查值是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 检查值是否为函数
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

