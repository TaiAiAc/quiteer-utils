import type { FetchError, RequestConfig, ResponseData } from './types'

class InterceptorManager<T> {
  private handlers: (T | null)[] = []

  use(handler: T) {
    this.handlers.push(handler)
    return this.handlers.length - 1 // 返回拦截器ID
  }

  eject(id: number) {
    this.handlers[id] = null
  }

  forEach(fn: (handler: T) => void) {
    this.handlers.forEach((handler) => {
      if (handler !== null)
        fn(handler)
    })
  }

  getHandlers(): T[] {
    return this.handlers.filter((handler): handler is T => handler !== null)
  }
}

export class Fetch {
  private baseUrl = ''
  private defaultHeaders: Record<string, string> = {}
  private timeout = 30000

  constructor(config?: {
    baseUrl?: string
    headers?: Record<string, string>
    timeout?: number
  }) {
    if (config) {
      this.baseUrl = config.baseUrl || ''
      this.defaultHeaders = config.headers || {}
      this.timeout = config.timeout || 30000
    }
  }

  useRequestInterceptor(handler: (config: RequestConfig) => RequestConfig) {
    return this.requestInterceptor.use(handler)
  }

  useResponseInterceptor(handler: (response: Response) => Promise<Response>) {
    return this.responseInterceptor.use(handler)
  }

  private requestInterceptor = new InterceptorManager<(config: RequestConfig) => RequestConfig>()
  private responseInterceptor = new InterceptorManager<(response: Response) => Promise<Response>>()

  private async processRequestBody(config: RequestConfig) {
    if (config.bodyType === 'form-data') {
      const formData = new FormData()
      Object.entries(config.data).forEach(([key, val]) => {
        formData.append(key, val as any)
      })
      return formData
    }
    return JSON.stringify(config.data)
  }

  private async handleResponse<T>(response: Response): Promise<ResponseData<T>> {
    if (!response.ok) {
      const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`) as FetchError
      error.type = 'HTTP'
      error.response = response
      try {
        error.message = await response.text()
      }
      catch {}
      throw error
    }

    try {
      const data = await response.json()
      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        config: {} as RequestConfig,
      }
    }
    catch (_) {
      const error = new Error('Failed to parse response') as FetchError
      error.type = 'NETWORK'
      error.response = response
      throw error
    }
  }

  private mergeConfig(config: RequestConfig): RequestConfig {
    return {
      ...config,
      url: this.baseUrl ? new URL(config.url, this.baseUrl).toString() : config.url,
      headers: {
        ...this.defaultHeaders,
        ...config.headers,
      },
    }
  }

  async request<T>(config: RequestConfig): Promise<ResponseData<T>> {
    let mergedConfig = this.mergeConfig(config)

    // 应用请求拦截器
    this.requestInterceptor.forEach((interceptor) => {
      mergedConfig = interceptor(mergedConfig)
    })

    const controller = new AbortController()
    const timeout = mergedConfig.timeout || this.timeout

    try {
      const body = await this.processRequestBody(mergedConfig)
      const response = await Promise.race([
        fetch(mergedConfig.url, {
          method: mergedConfig.method,
          headers: mergedConfig.headers,
          body,
          signal: controller.signal,
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => {
            controller.abort()
            reject(new Error(`Request timeout after ${timeout}ms`))
          }, timeout),
        ),
      ])

      // 应用响应拦截器（异步串行）
      let processedResponse = response
      for (const interceptor of this.responseInterceptor.getHandlers()) {
        processedResponse = await interceptor(processedResponse)
      }

      return this.handleResponse<T>(processedResponse)
    }
    catch (error) {
      const err = error as FetchError
      if (error.name === 'AbortError') {
        err.type = 'TIMEOUT'
      }
      throw err
    }
  }
}

// 保持原有导出兼容性
const defaultFetch = new Fetch()

export const httpRequest = defaultFetch.request.bind(defaultFetch)
export const mountInterceptor = {
  request: defaultFetch.useRequestInterceptor.bind(defaultFetch),
  response: defaultFetch.useResponseInterceptor.bind(defaultFetch),
}
