/**
 * 获取格式化的当前时间字符串
 * @param {string} format 时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
export function getCurrentTimeString(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  const now = new Date()
  const formatMap: { [key: string]: string } = {
    YYYY: String(now.getFullYear()),
    MM: String(now.getMonth() + 1).padStart(2, '0'),
    DD: String(now.getDate()).padStart(2, '0'),
    HH: String(now.getHours()).padStart(2, '0'),
    mm: String(now.getMinutes()).padStart(2, '0'),
    ss: String(now.getSeconds()).padStart(2, '0'),
  }

  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => formatMap[match])
}
