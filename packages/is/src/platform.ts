/* eslint-disable node/prefer-global/process */
/**
 * 平台检测函数
 */

/**
 * 检查是否运行在Windows系统上
 */
export function isWindows(): boolean {
  if (typeof process !== 'undefined' && process.platform === 'win32')
    return true
  if (typeof navigator !== 'undefined')
    return /win/i.test(navigator.platform)
  return false
}

/**
 * 检查是否运行在macOS系统上
 */
export function isMacOS(): boolean {
  if (typeof process !== 'undefined' && process.platform === 'darwin')
    return true
  if (typeof navigator !== 'undefined')
    return /mac/i.test(navigator.platform)
  return false
}

/**
 * 检查是否运行在Linux系统上
 */
export function isLinux(): boolean {
  if (typeof process !== 'undefined' && process.platform === 'linux')
    return true
  if (typeof navigator !== 'undefined')
    return /linux/i.test(navigator.platform)
  return false
}

/**
 * 检查是否运行在浏览器环境中
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 检查是否运行在Node.js环境中
 */
export function isNode(): boolean {
  return typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined'
}

/**
 * 检查是否运行在Electron环境中
 */
export function isElectron() {
  if (typeof window !== 'undefined' && typeof window.process !== 'undefined' && (window.process as any).type) {
    return true
  }
  return false
}

/**
 * 检查是否运行在微信环境中
 */
export function isWechat(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('micromessenger')
}
