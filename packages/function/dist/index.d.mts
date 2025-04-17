/**
 * 按时间间隔向数组中添加元素
 * @param arr 目标数组
 * @param item 要添加的元素
 * @param interval 时间间隔(ms)
 * @returns Promise
 */
declare function pushWithInterval<T>(arr: T[], item: T, interval: number): Promise<void>;
/**
 * 按时间间隔批量添加元素
 * @param arr 目标数组
 * @param items 要添加的元素数组
 * @param interval 时间间隔(ms)
 * @returns Promise
 */
declare function pushArrayWithInterval<T>(arr: T[], items: T[], interval: number): Promise<void>;

/**
 * 函数记忆(缓存函数的计算结果)
 * @param fn 要缓存的函数
 * @returns 带缓存的函数
 */
declare function memoize<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(fn: T): (this: This, ...args: Parameters<T>) => OmitThisParameter<ReturnType<T>>;

/**
 * 深拷贝函数
 * @param target 要拷贝的目标对象
 * @returns 深拷贝后的对象
 */
declare function deepClone<T>(target: T): T;

/**
 * 函数组合，从右到左执行函数
 * @param fns 要组合的函数数组
 * @returns 组合后的函数
 */
declare function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T;
/**
 * 函数管道，从左到右执行函数
 * @param fns 要组合的函数数组
 * @returns 组合后的函数
 */
declare function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T;

/**
 * 函数防抖
 * @param fn 要防抖的函数
 * @param wait 等待时间(ms)
 * @returns 防抖后的函数
 */
declare function debounce<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(fn: T, wait: number): (this: This, ...args: Parameters<T>) => void;
/**
 * 函数节流
 * @param fn 要节流的函数
 * @param wait 等待时间(ms)
 * @returns 节流后的函数
 */
declare function throttle<T extends (this: This, ...args: any[]) => any, This = ThisParameterType<T>>(fn: T, wait: number): (this: This, ...args: Parameters<T>) => void;

declare class PromiseQueue {
    private tasks;
    private isRunning;
    private isPaused;
    /**
     * 添加任务到队列
     * @param fn 异步函数
     * @returns Promise队列实例（支持链式调用）
     */
    add<T>(fn: () => Promise<T>): PromiseQueue;
    /**
     * 暂停任务执行
     */
    pause(): void;
    /**
     * 继续任务执行
     */
    resume(): void;
    /**
     * 清空任务队列
     */
    clear(): void;
    private run;
    /**
     * 获取当前队列状态
     */
    get status(): {
        pendingTasks: number;
        isRunning: boolean;
        isPaused: boolean;
    };
}

export { PromiseQueue, compose, debounce, deepClone, memoize, pipe, pushArrayWithInterval, pushWithInterval, throttle };
