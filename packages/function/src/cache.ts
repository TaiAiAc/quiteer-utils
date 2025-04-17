/**
 * 函数记忆(缓存函数的计算结果)
 * @param fn 要缓存的函数
 * @returns 带缓存的函数
 */
export function memoize<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(
  fn: T,
): (this: This, ...args: Parameters<T>) => OmitThisParameter<ReturnType<T>> {
  const cache = new Map()

  return function (...args: Parameters<T>): OmitThisParameter<ReturnType<T>> {
    const key = JSON.stringify(args)
    if (cache.has(key))
      return cache.get(key)

    const result = fn.apply(this as This, args)
    cache.set(key, result)
    return result
  }
}
