'use strict';

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

exports.PromiseQueue = PromiseQueue;
exports.compose = compose;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.memoize = memoize;
exports.pipe = pipe;
exports.pushArrayWithInterval = pushArrayWithInterval;
exports.pushWithInterval = pushWithInterval;
exports.throttle = throttle;
