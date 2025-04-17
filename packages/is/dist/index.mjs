function isChrome() {
  if (typeof navigator === "undefined")
    return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("chrome") && !ua.includes("edg");
}
function isFirefox() {
  if (typeof navigator === "undefined")
    return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("firefox");
}
function isSafari() {
  if (typeof navigator === "undefined")
    return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("safari") && !ua.includes("chrome");
}
function isEdge() {
  if (typeof navigator === "undefined")
    return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("edg");
}
function isOpera() {
  if (typeof navigator === "undefined")
    return false;
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("opr") || ua.includes("opera");
}

function isObject(value) {
  return value !== null && typeof value === "object";
}
function isArray(value) {
  return Array.isArray(value);
}
function isDate(value) {
  return value instanceof Date;
}
function isPromise(value) {
  return value instanceof Promise;
}

function isWindows() {
  if (typeof process !== "undefined" && process.platform === "win32")
    return true;
  if (typeof navigator !== "undefined")
    return /win/i.test(navigator.platform);
  return false;
}
function isMacOS() {
  if (typeof process !== "undefined" && process.platform === "darwin")
    return true;
  if (typeof navigator !== "undefined")
    return /mac/i.test(navigator.platform);
  return false;
}
function isLinux() {
  if (typeof process !== "undefined" && process.platform === "linux")
    return true;
  if (typeof navigator !== "undefined")
    return /linux/i.test(navigator.platform);
  return false;
}
function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function isNode() {
  return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
}
function isElectron() {
  if (typeof window !== "undefined" && typeof window.process !== "undefined" && window.process.type) {
    return true;
  }
  return false;
}

function isUndefined(value) {
  return value === void 0;
}
function isNull(value) {
  return value === null;
}
function isNullish(value) {
  return isNull(value) || isUndefined(value);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}

export { isArray, isBoolean, isBrowser, isChrome, isDate, isEdge, isElectron, isFirefox, isFunction, isLinux, isMacOS, isNode, isNull, isNullish, isNumber, isObject, isOpera, isPromise, isSafari, isString, isUndefined, isWindows };
