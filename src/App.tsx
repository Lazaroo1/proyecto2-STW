import { useEffect } from 'react'
import { Display } from './components/Display'
import { Keyboard } from './components/Keyboard'
import { useCalculator } from './hooks/useCalculator'

export function App () {
  const calculator = useCalculator()

  useEffect(() => {
    function handleKeyDown (event: KeyboardEvent): void {
      const key = event.key.toLowerCase()

      if (/^\d$/.test(event.key)) {
        event.preventDefault()
        calculator.inputDigit(event.key)
        return
      }

      if (['+', '-', '*', '/'].includes(event.key)) {
        event.preventDefault()
        calculator.inputOperator(event.key)
        return
      }

      if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault()
        calculator.calculate()
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        calculator.clear()
        return
      }

      if (event.key === '.') {
        event.preventDefault()
        calculator.inputDecimal()
        return
      }

      if (key === 'n' || key === 'm') {
        event.preventDefault()
        calculator.toggleSign()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [calculator])

  return (
    <main className="app-shell">
      <div aria-label="Calculator application" className="calculator-app" role="application">
        <h1 className="sr-only">Calculadora</h1>
        <Display value={calculator.display} />
        <Keyboard
          onCalculate={calculator.calculate}
          onClear={calculator.clear}
          onDecimal={calculator.inputDecimal}
          onDigit={calculator.inputDigit}
          onOperator={calculator.inputOperator}
          onToggleSign={calculator.toggleSign}
        />
      </div>
    </main>
  )
}
