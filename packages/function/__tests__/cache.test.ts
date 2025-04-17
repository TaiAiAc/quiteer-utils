import { describe, expect } from '@jest/globals'
import { memoize } from '../src/cache'

describe('cache Functions', () => {
  describe('memoize', () => {
    it('should cache function results', () => {
      let computeCount = 0
      const expensiveFunction = (a: number, b: number) => {
        computeCount++
        return a + b
      }

      const memoizedFn = memoize(expensiveFunction)

      // First call - should compute
      expect(memoizedFn(1, 2)).toBe(3)
      expect(computeCount).toBe(1)

      // Second call with same args - should use cache
      expect(memoizedFn(1, 2)).toBe(3)
      expect(computeCount).toBe(1)

      // Different args - should compute again
      expect(memoizedFn(2, 3)).toBe(5)
      expect(computeCount).toBe(2)
    })

    it('should handle complex arguments', () => {
      const fn = memoize((obj: { x: number }) => obj.x * 2)

      expect(fn({ x: 5 })).toBe(10)
      expect(fn({ x: 5 })).toBe(10)
    })

    it('should preserve this context', () => {
      const obj = {
        multiplier: 2,
        multiply(x: number) {
          return x * this.multiplier
        },
      }

      const memoizedMultiply = memoize(obj.multiply.bind(obj))
      expect(memoizedMultiply(5)).toBe(10)
    })
  })
})
