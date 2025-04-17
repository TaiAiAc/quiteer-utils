/**
 * RGB颜色对象
 */
interface RGB {
    r: number;
    g: number;
    b: number;
    a?: number;
}
/**
 * HSL颜色对象
 */
interface HSL {
    h: number;
    s: number;
    l: number;
    a?: number;
}
/**
 * 十六进制颜色字符串
 */
type HEX = string;
/**
 * 支持的颜色格式
 */
type ColorFormat = 'rgb' | 'hsl' | 'hex';
/**
 * 颜色混合模式
 */
type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';

/**
 * RGB转HSL
 * @param rgb RGB颜色对象
 * @returns HSL颜色对象
 */
declare function rgbToHsl({ r, g, b, a }: RGB): HSL;
/**
 * HSL转RGB
 * @param hsl HSL颜色对象
 * @returns RGB颜色对象
 */
declare function hslToRgb({ h, s, l, a }: HSL): RGB;
/**
 * RGB转HEX
 * @param rgb RGB颜色对象
 * @returns 十六进制颜色字符串
 */
declare function rgbToHex({ r, g, b, a }: RGB): HEX;
/**
 * HEX转RGB
 * @param hex 十六进制颜色字符串
 * @returns RGB颜色对象
 */
declare function hexToRgb(hex: HEX): RGB;

/**
 * 调整颜色亮度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
declare function adjustBrightness(rgb: RGB, amount: number): RGB;
/**
 * 调整颜色饱和度
 * @param rgb RGB颜色对象
 * @param amount 调整量(-100到100)
 * @returns 调整后的RGB颜色对象
 */
declare function adjustSaturation(rgb: RGB, amount: number): RGB;
/**
 * 混合两种颜色
 * @param color1 第一个RGB颜色对象
 * @param color2 第二个RGB颜色对象
 * @param mode 混合模式
 * @returns 混合后的RGB颜色对象
 */
declare function blendColors(color1: RGB, color2: RGB, mode?: BlendMode): RGB;
/**
 * 获取互补色
 * @param rgb RGB颜色对象
 * @returns 互补色的RGB颜色对象
 */
declare function getComplementaryColor(rgb: RGB): RGB;
/**
 * 获取颜色的反色
 * @param rgb RGB颜色对象
 * @returns 反色的RGB颜色对象
 */
declare function getInvertColor(rgb: RGB): RGB;
/**
 * 获取随机颜色
 * @param options 选项对象
 * @returns RGB颜色对象
 */
declare function getRandomColor(options?: {
    minBrightness?: number;
    maxBrightness?: number;
    saturation?: number;
}): RGB;

interface RequestConfig {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    data?: any;
    bodyType?: 'json' | 'form-data';
    timeout?: number;
}
interface ResponseData<T = any> {
    data: T;
    status: number;
    headers: Record<string, string>;
    config: RequestConfig;
}

declare class Fetch {
    private baseUrl;
    private defaultHeaders;
    private timeout;
    constructor(config?: {
        baseUrl?: string;
        headers?: Record<string, string>;
        timeout?: number;
    });
    useRequestInterceptor(handler: (config: RequestConfig) => RequestConfig): number;
    useResponseInterceptor(handler: (response: Response) => Promise<Response>): number;
    private requestInterceptor;
    private responseInterceptor;
    private processRequestBody;
    private handleResponse;
    private mergeConfig;
    request<T>(config: RequestConfig): Promise<ResponseData<T>>;
}
declare const httpRequest: <T>(config: RequestConfig) => Promise<ResponseData<T>>;
declare const mountInterceptor: {
    request: (handler: (config: RequestConfig) => RequestConfig) => number;
    response: (handler: (response: Response) => Promise<Response>) => number;
};

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

/**
 * 客户端环境检测函数
 */
/**
 * 检测是否运行在Chrome浏览器上
 */
declare function isChrome(): boolean;
/**
 * 检测是否运行在Firefox浏览器上
 */
declare function isFirefox(): boolean;
/**
 * 检测是否运行在Safari浏览器上
 */
declare function isSafari(): boolean;
/**
 * 检测是否运行在Edge浏览器上
 */
declare function isEdge(): boolean;
/**
 * 检测是否运行在Opera浏览器上
 */
declare function isOpera(): boolean;

/**
 * 对象类型检查函数
 */
/**
 * 检查值是否为对象
 */
declare function isObject(value: unknown): value is object;
/**
 * 检查值是否为数组
 */
declare function isArray(value: unknown): value is unknown[];
/**
 * 检查值是否为日期对象
 */
declare function isDate(value: unknown): value is Date;
/**
 * 检查值是否为Promise对象
 */
declare function isPromise(value: unknown): value is Promise<unknown>;

/**
 * 平台检测函数
 */
/**
 * 检查是否运行在Windows系统上
 */
declare function isWindows(): boolean;
/**
 * 检查是否运行在macOS系统上
 */
declare function isMacOS(): boolean;
/**
 * 检查是否运行在Linux系统上
 */
declare function isLinux(): boolean;
/**
 * 检查是否运行在浏览器环境中
 */
declare function isBrowser(): boolean;
/**
 * 检查是否运行在Node.js环境中
 */
declare function isNode(): boolean;
/**
 * 检查是否运行在Electron环境中
 */
declare function isElectron(): boolean;

/**
 * 基本类型检查函数
 */
/**
 * 检查值是否为undefined
 */
declare function isUndefined(value: unknown): value is undefined;
/**
 * 检查值是否为null
 */
declare function isNull(value: unknown): value is null;
/**
 * 检查值是否为空值（null或undefined）
 */
declare function isNullish(value: unknown): value is null | undefined;
/**
 * 检查值是否为字符串
 */
declare function isString(value: unknown): value is string;
/**
 * 检查值是否为数字
 */
declare function isNumber(value: unknown): value is number;
/**
 * 检查值是否为布尔值
 */
declare function isBoolean(value: unknown): value is boolean;
/**
 * 检查值是否为函数
 */
declare function isFunction(value: unknown): value is Function;

export { Fetch, PromiseQueue, adjustBrightness, adjustSaturation, blendColors, compose, debounce, deepClone, getComplementaryColor, getInvertColor, getRandomColor, hexToRgb, hslToRgb, httpRequest, isArray, isBoolean, isBrowser, isChrome, isDate, isEdge, isElectron, isFirefox, isFunction, isLinux, isMacOS, isNode, isNull, isNullish, isNumber, isObject, isOpera, isPromise, isSafari, isString, isUndefined, isWindows, memoize, mountInterceptor, pipe, pushArrayWithInterval, pushWithInterval, rgbToHex, rgbToHsl, throttle };
export type { BlendMode, ColorFormat, HEX, HSL, RGB };
