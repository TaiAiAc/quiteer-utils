/**
 * quiteer的类型检查函数
 */

// 客户端检测函数
export {
  isChrome,
  isEdge,
  isFirefox,
  isOpera,
  isSafari,
} from './client'

// 对象类型检查函数
export {
  isArray,
  isDate,
  isObject,
  isPromise,
} from './object'

// 平台检测函数
export {
  isBrowser,
  isElectron,
  isLinux,
  isMacOS,
  isNode,
  isWindows,
} from './platform'

// 基本类型检查函数
export {
  isBoolean,
  isFunction,
  isNull,
  isNullish,
  isNumber,
  isString,
  isUndefined,
} from './types'
