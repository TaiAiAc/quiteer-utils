/* eslint-disable no-restricted-globals */
import { beforeEach, describe, expect, test } from '@jest/globals'
import {
  isBrowser,
  isElectron,
  isLinux,
  isMacOS,
  isNode,
  isWindows,
} from '../src'

describe('平台检测', () => {
  const originalProcess = process
  const originalNavigator = navigator

  beforeEach(() => {
    // 重置全局对象
    Object.defineProperty(global, 'process', {
      value: { ...originalProcess },
      writable: true,
      configurable: true,
    })

    Object.defineProperty(global, 'window', {
      value: {},
      writable: true,
      configurable: true,
    })

    Object.defineProperty(global, 'document', {
      value: {},
      writable: true,
      configurable: true,
    })

    Object.defineProperty(global, 'navigator', {
      value: { ...originalNavigator },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    // 恢复原始值
    Object.defineProperty(global, 'process', {
      value: originalProcess,
      configurable: true,
    })

    Object.defineProperty(global, 'window', {
      value: undefined,
      configurable: true,
    })

    Object.defineProperty(global, 'document', {
      value: undefined,
      configurable: true,
    })

    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      configurable: true,
    })
  })

  test('Node环境检测', () => {
    Object.defineProperty(global, 'window', { value: undefined, configurable: true })
    Object.defineProperty(global, 'document', { value: undefined, configurable: true })
    expect(isNode()).toBe(true)
    expect(isBrowser()).toBe(false)
  })

  test('浏览器环境检测', () => {
    Object.defineProperty(global, 'process', { value: undefined, configurable: true })
    Object.defineProperty(global, 'window', { value: {}, configurable: true })
    Object.defineProperty(global, 'document', { value: {}, configurable: true })
    expect(isBrowser()).toBe(true)
  })

  test('操作系统检测', () => {
    // 模拟 macOS
    Object.defineProperty(global, 'navigator', {
      value: { ...originalNavigator, platform: 'MacIntel' },
      configurable: true,
    })
    expect(isMacOS()).toBe(true)

    // 模拟 Windows
    Object.defineProperty(global, 'navigator', {
      value: { ...originalNavigator, platform: 'Win32' },
      configurable: true,
    })
    expect(isWindows()).toBe(true)

    // 模拟 Linux
    Object.defineProperty(global, 'navigator', {
      value: { ...originalNavigator, platform: 'Linux x86_64' },
      configurable: true,
    })
    expect(isLinux()).toBe(true)
  })
})
