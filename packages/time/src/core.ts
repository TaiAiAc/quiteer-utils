/**
 * 获取当前时间
 * @returns {Date} 当前时间的Date对象
 */
export function getCurrentTime(): Date {
  return new Date()
}

/**
 * 获取当前时间戳
 * @returns {number} 当前时间的时间戳
 */
export function getCurrentTimestamp(): number {
  return Date.now()
}
