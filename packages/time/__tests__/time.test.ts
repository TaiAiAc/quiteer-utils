import { getCurrentTime, getCurrentTimestamp, getCurrentTimeString, getCurrentWeekDay } from '../src/index'

describe('时间工具库', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('getCurrentTime 返回Date对象', () => {
    const fixedDate = new Date('2024-01-15T12:34:56')
    jest.setSystemTime(fixedDate)
    expect(getCurrentTime()).toEqual(fixedDate)
  })

  it('getCurrentTimestamp 返回正确的时间戳', () => {
    const fixedTime = 1705300496000
    jest.setSystemTime(fixedTime)
    expect(getCurrentTimestamp()).toBe(fixedTime)
  })

  describe('getCurrentTimeString 格式化', () => {
    const testDate = new Date('2024-01-15T09:05:03')

    beforeEach(() => {
      jest.setSystemTime(testDate)
    })

    it('默认格式', () => {
      expect(getCurrentTimeString()).toBe('2024-01-15 09:05:03')
    })

    it('自定义格式', () => {
      expect(getCurrentTimeString('YYYY/MM/DD HH时mm分ss秒'))
        .toBe('2024/01/15 09时05分03秒')
    })

    it('月末边界情况处理', () => {
      const lastDay = new Date('2024-02-29T23:59:59')
      jest.setSystemTime(lastDay)
      expect(getCurrentTimeString('YYYY-MM-DD'))
        .toBe('2024-02-29')
    })
  })

  describe('getCurrentWeekDay 周几判断', () => {
    const testCases = [
      ['2024-01-14', '周日'],
      ['2024-01-15', '周一'],
      ['2024-01-16', '周二'],
      ['2024-01-17', '周三'],
      ['2024-01-18', '周四'],
      ['2024-01-19', '周五'],
      ['2024-01-20', '周六'],
    ]

    testCases.forEach(([date, expected]) => {
      it(`返回'周${expected}'表示${date}的星期数`, () => {
        jest.setSystemTime(new Date(date))
        expect(getCurrentWeekDay()).toBe(`${expected}`)
      })
    })
  })
})
