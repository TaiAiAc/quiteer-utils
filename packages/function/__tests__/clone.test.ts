import { describe, expect } from '@jest/globals'
import { deepClone } from '../src/clone'

describe('clone Functions', () => {
  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('test')).toBe('test')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
    })

    it('should clone Date objects', () => {
      const date = new Date()
      const clonedDate = deepClone(date)

      expect(clonedDate).toBeInstanceOf(Date)
      expect(clonedDate.getTime()).toBe(date.getTime())
      expect(clonedDate).not.toBe(date)
    })

    it('should clone RegExp objects', () => {
      const regex = /test/gi
      const clonedRegex = deepClone(regex)

      expect(clonedRegex).toBeInstanceOf(RegExp)
      expect(clonedRegex.source).toBe(regex.source)
      expect(clonedRegex.flags).toBe(regex.flags)
      expect(clonedRegex).not.toBe(regex)
    })

    it('should clone arrays', () => {
      const arr = [1, { x: 2 }, [3, 4]]
      const clonedArr = deepClone(arr)

      expect(clonedArr).toEqual(arr)
      expect(clonedArr).not.toBe(arr)
      expect(clonedArr[1]).not.toBe(arr[1])
      expect(clonedArr[2]).not.toBe(arr[2])
    })

    it('should clone nested objects', () => {
      const obj = {
        a: 1,
        b: { c: 2, d: { e: 3 } },
        f: [4, { g: 5 }],
      }
      const clonedObj = deepClone(obj)

      expect(clonedObj).toEqual(obj)
      expect(clonedObj).not.toBe(obj)
      expect(clonedObj.b).not.toBe(obj.b)
      expect(clonedObj.b.d).not.toBe(obj.b.d)
      expect(clonedObj.f).not.toBe(obj.f)
      expect(clonedObj.f[1]).not.toBe(obj.f[1])
    })
  })
})
