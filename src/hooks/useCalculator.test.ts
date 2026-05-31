import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCalculator } from './useCalculator'

function inputDigits (inputDigit: (digit: string) => void, digits: string): void {
  digits.split('').forEach(digit => inputDigit(digit))
}

describe('useCalculator', () => {
  it('concatenates multiple digits and stops at 9 characters', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => inputDigits(result.current.inputDigit, '1234567890'))

    expect(result.current.display).toBe('123456789')
    expect(result.current.display).toHaveLength(9)
  })

  it('stores an operator and computes an intermediate result before storing another operator', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.inputDigit('5')
      result.current.inputOperator('+')
    })

    expect(result.current.display).toBe('5')
    expect(result.current.operator).toBe('+')
    expect(result.current.storedValue).toBe(5)
    expect(result.current.waitingForOperand).toBe(true)

    act(() => {
      result.current.inputDigit('3')
      result.current.inputOperator('*')
    })

    expect(result.current.display).toBe('8')
    expect(result.current.operator).toBe('*')
    expect(result.current.storedValue).toBe(8)
    expect(result.current.waitingForOperand).toBe(true)
  })

  it('shows ERROR when dividing by zero', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.inputDigit('8')
      result.current.inputOperator('/')
      result.current.inputDigit('0')
      result.current.calculate()
    })

    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR when an addition result is greater than 999999999', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      inputDigits(result.current.inputDigit, '999999999')
      result.current.inputOperator('+')
      result.current.inputDigit('1')
      result.current.calculate()
    })

    expect(result.current.display).toBe('ERROR')
  })

  it('shows ERROR when subtraction produces a negative result', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.inputDigit('2')
      result.current.inputOperator('-')
      result.current.inputDigit('5')
      result.current.calculate()
    })

    expect(result.current.display).toBe('ERROR')
  })

  it('truncates 22 divided by 7 to fit within 9 display characters', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      inputDigits(result.current.inputDigit, '22')
      result.current.inputOperator('/')
      result.current.inputDigit('7')
      result.current.calculate()
    })

    expect(result.current.display.length).toBeLessThanOrEqual(9)
    expect(result.current.display).toBe('3.1428571')
  })

  it('toggles the sign and counts the minus sign toward the 9-character limit', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      inputDigits(result.current.inputDigit, '12345678')
      result.current.toggleSign()
      result.current.inputDigit('9')
    })

    expect(result.current.display).toBe('-12345678')
    expect(result.current.display).toHaveLength(9)

    act(() => {
      result.current.toggleSign()
      result.current.inputDigit('9')
    })

    expect(result.current.display).toBe('123456789')
  })
})
