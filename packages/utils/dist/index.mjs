function rgbToHsl({ r, g, b, a = 1 }) {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a
  };
}
function hslToRgb({ h, s, l, a = 1 }) {
  if (h < 0 || h >= 360 || s < 0 || s > 100 || l < 0 || l > 100)
    throw new Error("\u65E0\u6548\u7684HSL\u503C");
  h /= 360;
  s /= 100;
  l /= 100;
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0)
        t += 1;
      if (t > 1)
        t -= 1;
      if (t < 1 / 6)
        return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2)
        return q2;
      if (t < 2 / 3)
        return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a
  };
}
function rgbToHex({ r, g, b, a = 1 }) {
  const toHex = (n) => {
    const hex2 = Math.round(n).toString(16);
    return hex2.length === 1 ? `0${hex2}` : hex2;
  };
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a === 1 ? hex : `${hex}${toHex(Math.round(a * 255))}`;
}
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r2, g2, b2, a2) => r2 + r2 + g2 + g2 + b2 + b2 + (a2 ? a2 + a2 : ""));
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(fullHex);
  if (!result)
    throw new Error("Invalid hex color");
  const [, r, g, b, a] = result;
  return {
    r: Number.parseInt(r, 16),
    g: Number.parseInt(g, 16),
    b: Number.parseInt(b, 16),
    a: a ? Number.parseInt(a, 16) / 255 : 1
  };
}

function adjustBrightness(rgb, amount) {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  if (amount < 0 || amount > 100)
    throw new Error("\u65E0\u6548\u7684\u4EAE\u5EA6\u8C03\u6574\u503C");
  const hsl = rgbToHsl(rgb);
  hsl.l = Math.max(0, Math.min(100, amount));
  const result = hslToRgb(hsl);
  result.a = rgb.a !== void 0 ? rgb.a : 1;
  return result;
}
function adjustSaturation(rgb, amount) {
  if (rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255)
    throw new Error("\u65E0\u6548\u7684RGB\u503C");
  if (amount < -100 || amount > 100)
    throw new Error("\u65E0\u6548\u7684\u9971\u548C\u5EA6\u8C03\u6574\u503C");
  const hsl = rgbToHsl(rgb);
  if (rgb.r === rgb.g && rgb.g === rgb.b) {
    hsl.s = 0;
  } else {
    hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  }
  const result = hslToRgb(hsl);
  result.a = rgb.a !== void 0 ? rgb.a : 1;
  return result;
}
function blendColors(color1, color2, mode = "normal") {
  const blend = {
    normal: (a, b) => b,
    multiply: (a, b) => a * b / 255,
    screen: (a, b) => 255 - (255 - a) * (255 - b) / 255,
    overlay: (a, b) => {
      if (a < 128) {
        return Math.round(2 * a * b / 255);
      } else {
        return Math.round(255 - 2 * (255 - a) * (255 - b) / 255);
      }
    },
    darken: (a, b) => Math.min(a, b),
    lighten: (a, b) => Math.max(a, b)
  };
  return {
    r: Math.round(blend[mode](color1.r, color2.r)),
    g: Math.round(blend[mode](color1.g, color2.g)),
    b: Math.round(blend[mode](color1.b, color2.b)),
    a: color1.a !== void 0 && color2.a !== void 0 ? (color1.a + color2.a) / 2 : 1
  };
}
function getComplementaryColor(rgb) {
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + 180) % 360;
  hsl.a = rgb.a !== void 0 ? rgb.a : 1;
  return hslToRgb(hsl);
}
function getInvertColor(rgb) {
  return {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
    a: rgb.a
  };
}
function getRandomColor(options = {}) {
  const {
    minBrightness = 20,
    maxBrightness = 80,
    saturation = 70
  } = options;
  const hsl = {
    h: Math.floor(Math.random() * 360),
    s: saturation,
    l: Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness)
  };
  return hslToRgb(hsl);
}

class InterceptorManager {
  handlers = [];
  use(handler) {
    this.handlers.push(handler);
    return this.handlers.length - 1;
  }
  eject(id) {
    this.handlers[id] = null;
  }
  forEach(fn) {
    this.handlers.forEach((handler) => {
      if (handler !== null)
        fn(handler);
    });
  }
  getHandlers() {
    return this.handlers.filter((handler) => handler !== null);
  }
}
class Fetch {
  baseUrl = "";
  defaultHeaders = {};
  timeout = 3e4;
  constructor(config) {
    if (config) {
      this.baseUrl = config.baseUrl || "";
      this.defaultHeaders = config.headers || {};
      this.timeout = config.timeout || 3e4;
    }
  }
  useRequestInterceptor(handler) {
    return this.requestInterceptor.use(handler);
  }
  useResponseInterceptor(handler) {
    return this.responseInterceptor.use(handler);
  }
  requestInterceptor = new InterceptorManager();
  responseInterceptor = new InterceptorManager();
  async processRequestBody(config) {
    if (config.bodyType === "form-data") {
      const formData = new FormData();
      Object.entries(config.data).forEach(([key, val]) => {
        formData.append(key, val);
      });
      return formData;
    }
    return JSON.stringify(config.data);
  }
  async handleResponse(response) {
    if (!response.ok) {
      const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      error.type = "HTTP";
      error.response = response;
      try {
        error.message = await response.text();
      } catch {
      }
      throw error;
    }
    try {
      const data = await response.json();
      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        config: {}
      };
    } catch (_) {
      const error = new Error("Failed to parse response");
      error.type = "NETWORK";
      error.response = response;
      throw error;
    }
  }
  mergeConfig(config) {
    return {
      ...config,
      url: this.baseUrl ? new URL(config.url, this.baseUrl).toString() : config.url,
      headers: {
        ...this.defaultHeaders,
        ...config.headers
      }
    };
  }
  async request(config) {
    let mergedConfig = this.mergeConfig(config);
    this.requestInterceptor.forEach((interceptor) => {
      mergedConfig = interceptor(mergedConfig);
    });
    const controller = new AbortController();
    const timeout = mergedConfig.timeout || this.timeout;
    try {
      const body = await this.processRequestBody(mergedConfig);
      const response = await Promise.race([
        fetch(mergedConfig.url, {
          method: mergedConfig.method,
          headers: mergedConfig.headers,
          body,
          signal: controller.signal
        }),
        new Promise(
          (_, reject) => setTimeout(() => {
            controller.abort();
            reject(new Error(`Request timeout after ${timeout}ms`));
          }, timeout)
        )
      ]);
      let processedResponse = response;
      for (const interceptor of this.responseInterceptor.getHandlers()) {
        processedResponse = await interceptor(processedResponse);
      }
      return this.handleResponse(processedResponse);
    } catch (error) {
      const err = error;
      if (error.name === "AbortError") {
        err.type = "TIMEOUT";
      }
      throw err;
    }
  }
}
const defaultFetch = new Fetch();
const httpRequest = defaultFetch.request.bind(defaultFetch);
const mountInterceptor = {
  request: defaultFetch.useRequestInterceptor.bind(defaultFetch),
  response: defaultFetch.useResponseInterceptor.bind(defaultFetch)
};

function pushWithInterval(arr, item, interval) {
  return new Promise((resolve) => {
    setTimeout(() => {
      arr.push(item);
      resolve();
    }, interval);
  });
}
async function pushArrayWithInterval(arr, items, interval) {
  for (const item of items)
    await pushWithInterval(arr, item, interval);
}

function memoize(fn) {
  const cache = /* @__PURE__ */ new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key))
      return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function deepClone(target) {
  if (target === null || typeof target !== "object")
    return target;
  if (target instanceof Date)
    return new Date(target.getTime());
  if (target instanceof RegExp)
    return new RegExp(target);
  const clone = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key))
      clone[key] = deepClone(target[key]);
  }
  return clone;
}

function compose(...fns) {
  return fns.reduce((a, b) => (arg) => a(b(arg)), (x) => x);
}
function pipe(...fns) {
  return fns.reduceRight((a, b) => (arg) => a(b(arg)), (x) => x);
}

function debounce(fn, wait) {
  let timer = null;
  return function(...args) {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
function throttle(fn, wait) {
  let timer = null;
  let previous = 0;
  return function(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        previous = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

class PromiseQueue {
  tasks = [];
  isRunning = false;
  isPaused = false;
  /**
   * 添加任务到队列
   * @param fn 异步函数
   * @returns Promise队列实例（支持链式调用）
   */
  add(fn) {
    new Promise((resolve, reject) => {
      this.tasks.push({ fn, resolve, reject });
    });
    if (!this.isRunning)
      this.run();
    return this;
  }
  /**
   * 暂停任务执行
   */
  pause() {
    this.isPaused = true;
  }
  /**
   * 继续任务执行
   */
  resume() {
    if (!this.isPaused)
      return;
    this.isPaused = false;
    this.run();
  }
  /**
   * 清空任务队列
   */
  clear() {
    this.tasks = [];
  }
  async run() {
    this.isRunning = true;
    while (this.tasks.length > 0 && !this.isPaused) {
      const task = this.tasks.shift();
      if (!task)
        continue;
      try {
        const result = await task.fn();
        task.resolve(result);
      } catch (error) {
        task.reject(error);
      }
    }
    this.isRunning = false;
  }
  /**
   * 获取当前队列状态
   */
  get status() {
    return {
      pendingTasks: this.tasks.length,
      isRunning: this.isRunning,
      isPaused: this.isPaused
    };
  }
}

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

export { Fetch, PromiseQueue, adjustBrightness, adjustSaturation, blendColors, compose, debounce, deepClone, getComplementaryColor, getInvertColor, getRandomColor, hexToRgb, hslToRgb, httpRequest, isArray, isBoolean, isBrowser, isChrome, isDate, isEdge, isElectron, isFirefox, isFunction, isLinux, isMacOS, isNode, isNull, isNullish, isNumber, isObject, isOpera, isPromise, isSafari, isString, isUndefined, isWindows, memoize, mountInterceptor, pipe, pushArrayWithInterval, pushWithInterval, rgbToHex, rgbToHsl, throttle };
