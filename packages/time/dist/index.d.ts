/**
 * 获取当前时间
 * @returns {Date} 当前时间的Date对象
 */
declare function getCurrentTime(): Date;
/**
 * 获取当前时间戳
 * @returns {number} 当前时间的时间戳
 */
declare function getCurrentTimestamp(): number;

/**
 * 获取格式化的当前时间字符串
 * @param {string} format 时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的时间字符串
 */
declare function getCurrentTimeString(format?: string): string;

/**
 * 获取今天是星期几
 * @returns {string} 返回中文星期几
 */
declare function getCurrentWeekDay(): string;

export { getCurrentTime, getCurrentTimeString, getCurrentTimestamp, getCurrentWeekDay };
