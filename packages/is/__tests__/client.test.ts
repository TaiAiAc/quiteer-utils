import { describe, expect, test } from '@jest/globals'
import {
  isChrome,
  isEdge,
  isFirefox,
  isOpera,
  isSafari,
} from '../src'

function mockUserAgent(ua: string) {
  Object.defineProperty(navigator, 'userAgent', {
    value: ua,
    writable: true,
  })
}

describe('浏览器检测', () => {
  test('Chrome检测', () => {
    mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
    expect(isChrome()).toBe(true)
  })

  test('Firefox检测', () => {
    mockUserAgent('Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0')
    expect(isFirefox()).toBe(true)
  })

  test('Safari检测', () => {
    mockUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15')
    expect(isSafari()).toBe(true)
  })
})
