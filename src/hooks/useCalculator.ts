import { useReducer } from 'react'

const MAX_DISPLAY_LENGTH = 9
const MAX_RESULT = 999999999
const ERROR_DISPLAY = 'ERROR'

interface CalculatorState {
  display: string
  operator: string | null
  storedValue: number | null
  waitingForOperand: boolean
}

export interface UseCalculatorReturn extends CalculatorState {
  inputDigit: (digit: string) => void
  inputDecimal: () => void
  inputOperator: (op: string) => void
  calculate: () => void
  toggleSign: () => void
  clear: () => void
}

type CalculatorAction =
  | { type: 'inputDigit'; digit: string }
  | { type: 'inputDecimal' }
  | { type: 'inputOperator'; operator: string }
  | { type: 'calculate' }
  | { type: 'toggleSign' }
  | { type: 'clear' }

type CalculationResult =
  | { error: false; display: string; value: number }
  | { error: true; display: typeof ERROR_DISPLAY; value: null }

const initialState: CalculatorState = {
  display: '0',
  operator: null,
  storedValue: null,
  waitingForOperand: false
}

export function useCalculator (): UseCalculatorReturn {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  return {
    ...state,
    inputDigit: digit => dispatch({ type: 'inputDigit', digit }),
    inputDecimal: () => dispatch({ type: 'inputDecimal' }),
    inputOperator: op => dispatch({ type: 'inputOperator', operator: op }),
    calculate: () => dispatch({ type: 'calculate' }),
    toggleSign: () => dispatch({ type: 'toggleSign' }),
    clear: () => dispatch({ type: 'clear' })
  }
}

function calculatorReducer (state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'inputDigit':
      return inputDigit(state, action.digit)
    case 'inputDecimal':
      return inputDecimal(state)
    case 'inputOperator':
      return inputOperator(state, action.operator)
    case 'calculate':
      return calculateState(state)
    case 'toggleSign':
      return toggleSign(state)
    case 'clear':
      return resetState()
  }
}

function inputDigit (state: CalculatorState, digit: string): CalculatorState {
  if (!/^\d$/.test(digit)) {
    return state
  }

  if (state.display === ERROR_DISPLAY) {
    return {
      ...resetState(),
      display: digit
    }
  }

  if (state.waitingForOperand) {
    return {
      ...state,
      display: digit,
      waitingForOperand: false
    }
  }

  if (state.display === '0') {
    return {
      ...state,
      display: digit
    }
  }

  if (state.display === '-0') {
    return {
      ...state,
      display: `-${digit}`
    }
  }

  if (state.display.length >= MAX_DISPLAY_LENGTH) {
    return state
  }

  return {
    ...state,
    display: `${state.display}${digit}`
  }
}

function inputDecimal (state: CalculatorState): CalculatorState {
  if (state.display === ERROR_DISPLAY) {
    return {
      ...resetState(),
      display: '0.'
    }
  }

  if (state.waitingForOperand) {
    return {
      ...state,
      display: '0.',
      waitingForOperand: false
    }
  }

  if (state.display.includes('.') || state.display.length >= MAX_DISPLAY_LENGTH) {
    return state
  }

  return {
    ...state,
    display: `${state.display}.`
  }
}

function inputOperator (state: CalculatorState, operator: string): CalculatorState {
  if (!isSupportedOperator(operator) || state.display === ERROR_DISPLAY) {
    return state
  }

  if (state.operator !== null && state.storedValue !== null && !state.waitingForOperand) {
    const calculation = runCalculation(state.storedValue, state.operator, Number(state.display))

    if (calculation.error) {
      return errorState()
    }

    return {
      display: calculation.display,
      operator,
      storedValue: calculation.value,
      waitingForOperand: true
    }
  }

  return {
    ...state,
    operator,
    storedValue: state.storedValue ?? Number(state.display),
    waitingForOperand: true
  }
}

function calculateState (state: CalculatorState): CalculatorState {
  if (state.operator === null || state.storedValue === null || state.display === ERROR_DISPLAY) {
    return state
  }

  const calculation = runCalculation(state.storedValue, state.operator, Number(state.display))

  if (calculation.error) {
    return errorState()
  }

  return {
    display: calculation.display,
    operator: null,
    storedValue: null,
    waitingForOperand: true
  }
}

function toggleSign (state: CalculatorState): CalculatorState {
  if (state.display === ERROR_DISPLAY) {
    return state
  }

  if (state.display.startsWith('-')) {
    return {
      ...state,
      display: state.display.slice(1),
      waitingForOperand: false
    }
  }

  if (state.display.length >= MAX_DISPLAY_LENGTH) {
    return state
  }

  return {
    ...state,
    display: `-${state.display}`,
    waitingForOperand: false
  }
}

function runCalculation (left: number, operator: string, right: number): CalculationResult {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return errorResult()
  }

  if ((operator === '/' || operator === '%') && right === 0) {
    return errorResult()
  }

  let result: number

  switch (operator) {
    case '+':
      result = left + right

      if (result > MAX_RESULT) {
        return errorResult()
      }

      break
    case '-':
      result = left - right

      if (result < 0) {
        return errorResult()
      }

      break
    case '*':
      result = left * right

      if (result > MAX_RESULT) {
        return errorResult()
      }

      break
    case '/':
      result = left / right
      break
    case '%':
      result = left % right
      break
    default:
      return errorResult()
  }

  if (!Number.isFinite(result)) {
    return errorResult()
  }

  return {
    error: false,
    display: formatResult(result),
    value: result
  }
}

function formatResult (result: number): string {
  if (Object.is(result, -0)) {
    return '0'
  }

  const plainResult = toPlainResult(result)

  if (plainResult.length <= MAX_DISPLAY_LENGTH) {
    return plainResult
  }

  const truncatedResult = plainResult.slice(0, MAX_DISPLAY_LENGTH)

  return truncatedResult.endsWith('.')
    ? truncatedResult.slice(0, -1)
    : truncatedResult
}

function toPlainResult (result: number): string {
  const stringResult = String(result)

  if (!stringResult.includes('e')) {
    return stringResult
  }

  return result.toFixed(MAX_DISPLAY_LENGTH).replace(/\.?0+$/, '')
}

function isSupportedOperator (operator: string): boolean {
  return ['+', '-', '*', '/', '%'].includes(operator)
}

function errorResult (): CalculationResult {
  return {
    error: true,
    display: ERROR_DISPLAY,
    value: null
  }
}

function errorState (): CalculatorState {
  return {
    display: ERROR_DISPLAY,
    operator: null,
    storedValue: null,
    waitingForOperand: true
  }
}

function resetState (): CalculatorState {
  return { ...initialState }
}
