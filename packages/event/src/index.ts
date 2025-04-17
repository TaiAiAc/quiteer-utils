interface EventMap {
  [event: string]: (...args: any[]) => void
}

export class EventEmitter<T extends EventMap = EventMap> {
  private listeners = new Map<keyof T, Set<T[keyof T]>>()

  on<K extends keyof T>(event: K, listener: T[K]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(listener)
    return this
  }

  off<K extends keyof T>(event: K, listener?: T[K]) {
    if (!listener) {
      this.listeners.delete(event)
      return this
    }
    this.listeners.get(event)?.delete(listener)
    return this
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>) {
    this.listeners.get(event)?.forEach((listener) => {
      try {
        listener(...args)
      }
      catch (e) {
        // 先触发 error 事件再输出日志
        this.emit('error', ...[e] as Parameters<T['error']>)
        console.error(`Error in ${String(event)} listener:`, e)
      }
    })
    return this
  }
}
