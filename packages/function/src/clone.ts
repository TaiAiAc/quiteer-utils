/**
 * 深拷贝函数
 * @param target 要拷贝的目标对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(target: T): T {
  // 处理基本类型和null
  if (target === null || typeof target !== 'object')
    return target

  // 处理日期对象
  if (target instanceof Date)
    return new Date(target.getTime()) as any

  // 处理正则表达式
  if (target instanceof RegExp)
    return new RegExp(target) as any

  // 处理数组和对象
  const clone = Array.isArray(target) ? [] : {} as any

  // 递归拷贝所有属性
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key))
      clone[key] = deepClone(target[key])
  }

  return clone
}
