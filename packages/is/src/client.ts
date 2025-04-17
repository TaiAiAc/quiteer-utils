/**
 * 客户端环境检测函数
 */

/**
 * 检测是否运行在Chrome浏览器上
 */
export function isChrome(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('chrome') && !ua.includes('edg')
}

/**
 * 检测是否运行在Firefox浏览器上
 */
export function isFirefox(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('firefox')
}

/**
 * 检测是否运行在Safari浏览器上
 */
export function isSafari(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('safari') && !ua.includes('chrome')
}

/**
 * 检测是否运行在Edge浏览器上
 */
export function isEdge(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('edg')
}

/**
 * 检测是否运行在Opera浏览器上
 */
export function isOpera(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('opr') || ua.includes('opera')
}

/**
 * 检测是否运行在移动设备上
 */
export function isMobile(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
}

/**
 * 检测是否运行在平板设备上
 */
export function isTablet(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(ua)
}

/**
 * 检测是否运行在桌面设备上
 */
export function isDesktop(): boolean {
  return !isMobile() && !isTablet()
}

/**
 * 检测是否运行在iOS系统上
 */
export function isIOS(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua)
}

/**
 * 检测是否运行在Android系统上
 */
export function isAndroid(): boolean {
  if (typeof navigator === 'undefined')
    return false
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('android')
}
