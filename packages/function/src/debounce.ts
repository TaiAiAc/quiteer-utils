/**
 * 函数防抖
 * @param fn 要防抖的函数
 * @param wait 等待时间(ms)
 * @returns 防抖后的函数
 */
export function debounce<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(
  fn: T,
  wait: number,
): (this: This, ...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null

  return function (this: This, ...args: Parameters<T>) {
    if (timer)
      clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this as This, args)
    }, wait)
  }
}

/**
 * 函数节流
 * @param fn 要节流的函数
 * @param wait 等待时间(ms)
 * @returns 节流后的函数
 */
export function throttle<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(
  fn: T,
  wait: number,
): (this: This, ...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null
  let previous = 0

  return function (this: This, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      previous = now
      fn.apply(this as This, args)
    }
    else if (!timer) {
      timer = setTimeout(() => {
        previous = Date.now()
        timer = null
        fn.apply(this as This, args)
      }, remaining)
    }
  }
}
