/**
 * 对象类型检查函数
 */

/**
 * 检查值是否为对象
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}

/**
 * 检查值是否为数组
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

/**
 * 检查值是否为日期对象
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date
}

/**
 * 检查值是否为Promise对象
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return value instanceof Promise
}
