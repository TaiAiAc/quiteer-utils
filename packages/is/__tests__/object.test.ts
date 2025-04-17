import { describe, expect, test } from '@jest/globals'
import {
  isArray,
  isDate,
  isObject,
  isPromise,
} from '../src'

describe('对象类型检测', () => {
  test('数组检测', () => {
    expect(isArray([])).toBe(true)
    expect(isArray({ length: 0 })).toBe(false)
  })

  test('日期对象检测', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate('2023-01-01')).toBe(false)
  })

  test('Promise检测', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({ then: true })).toBe(false)
  })

  test('对象检测', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
  })
})
