/**
 * 获取今天是星期几
 * @returns {string} 返回中文星期几
 */
export function getCurrentWeekDay(): string {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const now = new Date()
  return `周${weekDays[now.getDay()]}`
}
