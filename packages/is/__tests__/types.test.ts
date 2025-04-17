import { describe, expect, test } from '@jest/globals'
import {
  isBoolean,
  isFunction,
  isNull,
  isNullish,
  isNumber,
  isString,
  isUndefined,
} from '../src'

describe('基本类型检测', () => {
  test.each([
    [isBoolean, true, [true, false], [1, 'true', {}]],
    [isFunction, () => {}, [Math.sin, class A {}], [null, 'function']],
    [isNull, null, [null], [undefined, 0]],
    [isNullish, undefined, [null, undefined], ['', 0, false]],
    [isNumber, 42, [0, 3.14], [Number.NaN, '42', null, undefined]],
    [isString, 'test', [String(123)], [null, 123]],
    [isUndefined, undefined, [undefined], [null, 0]],
  ])('%# %s', (fn, successCase, successCases, failCases) => {
    [successCase, ...successCases].forEach(v => expect(fn(v)).toBe(true))
    failCases.forEach(v => expect(fn(v)).toBe(false))
  })
})
