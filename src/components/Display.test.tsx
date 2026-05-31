import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Display } from './Display'

afterEach(() => cleanup())

describe('Display', () => {
  it('renders the value passed as prop', () => {
    render(<Display value="12345" />)

    expect(screen.getByTestId('display').textContent).toBe('12345')
  })

  it('applies error CSS class when value is ERROR', () => {
    render(<Display value="ERROR" />)

    expect(screen.getByTestId('display').classList.contains('display--error')).toBe(true)
  })

  it('has the correct aria-label', () => {
    render(<Display value="0" />)

    expect(screen.getByLabelText('Calculator display')).toBe(screen.getByTestId('display'))
  })
})
