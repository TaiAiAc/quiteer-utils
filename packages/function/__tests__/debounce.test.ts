import { describe, expect, it } from '@jest/globals'
import { debounce, throttle } from '../src/debounce'

describe('防抖节流函数', () => {
  jest.useFakeTimers()

  describe('防抖函数', () => {
    it('应该在等待时间结束后才执行', () => {
      const fn = jest.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn()
      expect(fn).not.toBeCalled()

      jest.advanceTimersByTime(50)
      debouncedFn()
      expect(fn).not.toBeCalled()

      jest.advanceTimersByTime(100)
      expect(fn).toBeCalledTimes(1)
    })

    it('应该使用最新的参数', () => {
      const fn = jest.fn()
      const debouncedFn = debounce(fn, 100)

      debouncedFn('first')
      debouncedFn('second')

      jest.advanceTimersByTime(100)
      expect(fn).toBeCalledWith('second')
    })
  })

  describe('节流函数', () => {
    it('应该立即执行然后等待', () => {
      const fn = jest.fn()
      const throttledFn = throttle(fn, 100)

      throttledFn()
      expect(fn).toBeCalledTimes(1)

      throttledFn()
      expect(fn).toBeCalledTimes(1)

      jest.advanceTimersByTime(100)
      throttledFn()
      expect(fn).toBeCalledTimes(2)
    })

    it('应该保持this上下文', () => {
      const obj = {
        value: 0,
        increment() {
          this.value++
        },
      }

      const throttledIncrement = throttle(obj.increment.bind(obj), 100)

      throttledIncrement()
      expect(obj.value).toBe(1)

      throttledIncrement()
      expect(obj.value).toBe(1)

      jest.advanceTimersByTime(100)
      throttledIncrement()
      expect(obj.value).toBe(2)
    })
  })
})
