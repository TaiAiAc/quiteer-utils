interface EventMap {
    [event: string]: (...args: any[]) => void;
}
declare class EventEmitter<T extends EventMap = EventMap> {
    private listeners;
    on<K extends keyof T>(event: K, listener: T[K]): this;
    off<K extends keyof T>(event: K, listener?: T[K]): this;
    emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): this;
}

export { EventEmitter };
