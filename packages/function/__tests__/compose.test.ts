import { describe, expect, it } from '@jest/globals'
import { compose, pipe } from '../src/compose'

describe('函数组合', () => {
  describe('compose函数', () => {
    it('应该从右到左组合函数', () => {
      const add1 = (x: number) => x + 1
      const multiply2 = (x: number) => x * 2
      const subtract3 = (x: number) => x - 3

      const composed = compose(add1, multiply2, subtract3)

      // (5 - 3) * 2 + 1 = 5
      expect(composed(5)).toBe(5)
    })

    it('当没有提供函数时应返回恒等函数', () => {
      const composed = compose<number>()
      expect(composed(5)).toBe(5)
    })
  })

  describe('pipe函数', () => {
    it('应该从左到右管道处理函数', () => {
      const add1 = (x: number) => x + 1
      const multiply2 = (x: number) => x * 2
      const subtract3 = (x: number) => x - 3

      const piped = pipe(add1, multiply2, subtract3)

      // ((5 + 1) * 2) - 3 = 9
      expect(piped(5)).toBe(9)
    })

    it('当没有提供函数时应返回恒等函数', () => {
      const piped = pipe<number>()
      expect(piped(5)).toBe(5)
    })
  })
})
