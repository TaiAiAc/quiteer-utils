interface Task<T> {
  fn: () => Promise<T>
  resolve: (value: T) => void
  reject: (reason?: any) => void
}

export class PromiseQueue {
  private tasks: Task<any>[] = []
  private isRunning = false
  private isPaused = false

  /**
   * 添加任务到队列
   * @param fn 异步函数
   * @returns Promise队列实例（支持链式调用）
   */
  add<T>(fn: () => Promise<T>): PromiseQueue {
    const _ = new Promise<T>((resolve, reject) => {
      this.tasks.push({ fn, resolve, reject })
    })

    if (!this.isRunning)
      this.run()
    return this
  }

  /**
   * 暂停任务执行
   */
  pause(): void {
    this.isPaused = true
  }

  /**
   * 继续任务执行
   */
  resume(): void {
    if (!this.isPaused)
      return
    this.isPaused = false
    this.run()
  }

  /**
   * 清空任务队列
   */
  clear(): void {
    this.tasks = []
  }

  private async run(): Promise<void> {
    this.isRunning = true

    while (this.tasks.length > 0 && !this.isPaused) {
      const task = this.tasks.shift()
      if (!task)
        continue

      try {
        const result = await task.fn()
        task.resolve(result)
      }
      catch (error) {
        task.reject(error)
      }
    }

    this.isRunning = false
  }

  /**
   * 获取当前队列状态
   */
  get status() {
    return {
      pendingTasks: this.tasks.length,
      isRunning: this.isRunning,
      isPaused: this.isPaused,
    }
  }
}
