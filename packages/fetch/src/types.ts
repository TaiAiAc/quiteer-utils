export interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  data?: any
  bodyType?: 'json' | 'form-data'
  timeout?: number
}

export interface ResponseData<T = any> {
  data: T
  status: number
  headers: Record<string, string>
  config: RequestConfig
}

export type RequestInterceptor = (config: RequestConfig) => RequestConfig
export type ResponseInterceptor = (response: Response) => Promise<Response>

export interface FetchError extends Error {
  type: 'NETWORK' | 'TIMEOUT' | 'HTTP' | 'BUSINESS'
  config?: RequestConfig
  response?: Response
}
