/**
 * 按时间间隔向数组中添加元素
 * @param arr 目标数组
 * @param item 要添加的元素
 * @param interval 时间间隔(ms)
 * @returns Promise
 */
export function pushWithInterval<T>(arr: T[], item: T, interval: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      arr.push(item)
      resolve()
    }, interval)
  })
}

/**
 * 按时间间隔批量添加元素
 * @param arr 目标数组
 * @param items 要添加的元素数组
 * @param interval 时间间隔(ms)
 * @returns Promise
 */
export async function pushArrayWithInterval<T>(arr: T[], items: T[], interval: number): Promise<void> {
  for (const item of items)
    await pushWithInterval(arr, item, interval)
}
