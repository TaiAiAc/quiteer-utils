var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class InterceptorManager {
  constructor() {
    __publicField(this, "handlers", []);
  }
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
  constructor(config) {
    __publicField(this, "baseUrl", "");
    __publicField(this, "defaultHeaders", {});
    __publicField(this, "timeout", 3e4);
    __publicField(this, "requestInterceptor", new InterceptorManager());
    __publicField(this, "responseInterceptor", new InterceptorManager());
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

export { Fetch, httpRequest, mountInterceptor };
