import { describe, expect } from '@jest/globals'
import { pushArrayWithInterval, pushWithInterval } from '../src/array'

describe('数组函数', () => {
  describe('pushWithInterval函数', () => {
    it('应该在指定间隔后添加一个元素到数组', async () => {
      const arr: number[] = []
      const startTime = Date.now()

      await pushWithInterval(arr, 1, 100)
      const endTime = Date.now()

      expect(arr).toEqual([1])
      expect(endTime - startTime).toBeGreaterThanOrEqual(100)
    })
  })

  describe('pushArrayWithInterval函数', () => {
    it('应该按间隔添加多个元素到数组', async () => {
      const arr: number[] = []
      const items = [1, 2, 3]
      const interval = 100
      const startTime = Date.now()

      await pushArrayWithInterval(arr, items, interval)
      const endTime = Date.now()

      expect(arr).toEqual(items)
      expect(endTime - startTime).toBeGreaterThanOrEqual(interval * items.length)
    })
  })
})
