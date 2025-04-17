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

export { Fetch, httpRequest, mountInterceptor };
