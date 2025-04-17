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

export { isArray, isBoolean, isBrowser, isChrome, isDate, isEdge, isElectron, isFirefox, isFunction, isLinux, isMacOS, isNode, isNull, isNullish, isNumber, isObject, isOpera, isPromise, isSafari, isString, isUndefined, isWindows };
