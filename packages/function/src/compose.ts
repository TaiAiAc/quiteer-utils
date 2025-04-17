/**
 * 函数组合，从右到左执行函数
 * @param fns 要组合的函数数组
 * @returns 组合后的函数
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return fns.reduce((a, b) => (arg: T) => a(b(arg)), (x: T) => x)
}

/**
 * 函数管道，从左到右执行函数
 * @param fns 要组合的函数数组
 * @returns 组合后的函数
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return fns.reduceRight((a, b) => (arg: T) => a(b(arg)), (x: T) => x)
}
