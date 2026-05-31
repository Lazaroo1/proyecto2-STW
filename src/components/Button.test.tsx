import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

afterEach(() => cleanup())

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const onClick = vi.fn()

    render(<Button label="7" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: '7' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders the correct label', () => {
    render(<Button label="+" variant="operator" onClick={() => undefined} />)

    expect(screen.getByText('+')).toBeTruthy()
  })

  it('has the correct aria-label and data-testid', () => {
    render(<Button label="C" variant="action" onClick={() => undefined} />)

    const button = screen.getByTestId('button-C')

    expect(screen.getByLabelText('C')).toBe(button)
    expect(button.getAttribute('data-testid')).toBe('button-C')
  })
})
