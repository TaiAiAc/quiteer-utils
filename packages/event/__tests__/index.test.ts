import { beforeEach, describe, expect, it } from '@jest/globals'
import { EventEmitter } from '../src/index'

describe('EventEmitter Tests', () => {
  let emitter: EventEmitter

  beforeEach(() => {
    emitter = new EventEmitter()
  })

  describe('基础功能测试', () => {
    it('应正确订阅和触发事件', () => {
      const mockFn = jest.fn()
      emitter.on('test', mockFn)
      emitter.emit('test', 'hello')
      expect(mockFn).toHaveBeenCalledWith('hello')
    })

    it('应正确处理多个监听器', () => {
      const calls: string[] = []
      emitter.on('test', msg => calls.push(`A:${msg}`))
      emitter.on('test', msg => calls.push(`B:${msg}`))

      emitter.emit('test', 'event')
      expect(calls).toEqual(['A:event', 'B:event'])
    })

    it('应正确移除所有监听器', () => {
      const mockFn = jest.fn()
      emitter.on('test', mockFn)
      emitter.off('test')
      emitter.emit('test', 'should-not-call')
      expect(mockFn).not.toHaveBeenCalled()
    })

    it('应正确移除特定监听器', () => {
      const mockA = jest.fn()
      const mockB = jest.fn()
      emitter.on('test', mockA)
      emitter.on('test', mockB)
      emitter.off('test', mockA)
      emitter.emit('test', 'call-b-only')
      expect(mockA).not.toHaveBeenCalled()
      expect(mockB).toHaveBeenCalledWith('call-b-only')
    })
  })

  describe('边界情况测试', () => {
    it('应处理重复添加相同监听器', () => {
      const mockFn = jest.fn()
      emitter.on('test', mockFn)
      emitter.on('test', mockFn)
      emitter.emit('test', 'once')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('应安全处理移除不存在的监听器', () => {
      const mockFn = jest.fn()
      emitter.off('test', mockFn)
      expect(() => emitter.emit('test', 'safe')).not.toThrow()
    })

    it('应安全处理移除不存在的事件', () => {
      expect(() => emitter.off('nonexistent')).not.toThrow()
    })

    it('应安全处理触发没有监听器的事件', () => {
      expect(() => emitter.emit('test', 'no-listeners')).not.toThrow()
    })
  })

  describe('错误处理测试', () => {
    it('应正确处理监听器中的错误并触发error事件', () => {
      const errorMock = jest.fn()
      const testError = new Error('test error')
      const consoleSpy = jest.spyOn(console, 'error')
      emitter.on('error', errorMock)
      emitter.on('test', () => {
        throw testError
      })

      emitter.emit('test', 'trigger-error')
      expect(errorMock).toHaveBeenCalledWith(testError)
      expect(consoleSpy).toHaveBeenCalledWith('Error in test listener:', testError)
      expect(errorMock.mock.invocationCallOrder[0]).toBeLessThan(consoleSpy.mock.invocationCallOrder[0])
      consoleSpy.mockRestore()
    })

    it('应继续执行其他监听器即使某个监听器抛出错误', () => {
      const successMock = jest.fn()
      emitter.on('test', () => {
        throw new Error('first error')
      })
      emitter.on('test', msg => successMock(msg))

      emitter.emit('test', 'continue')
      expect(successMock).toHaveBeenCalledWith('continue')
    })

    it('应正确处理多个监听器的错误', () => {
      const errorMock = jest.fn()
      emitter.on('error', errorMock)
      emitter.on('test', () => {
        throw new Error('error 1')
      })
      emitter.on('test', () => {
        throw new Error('error 2')
      })

      emitter.emit('test', 'multiple-errors')
      expect(errorMock).toHaveBeenCalledTimes(2)
    })
  })

  describe('链式调用测试', () => {
    it('应支持方法的链式调用', () => {
      const mockFn = jest.fn()
      emitter
        .on('test', mockFn)
        .emit('test', 'chain')
        .off('test', mockFn)

      expect(mockFn).toHaveBeenCalledWith('chain')
      emitter.emit('test', 'after-off')
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })
})
