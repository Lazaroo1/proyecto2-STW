import { Display } from './components/Display'
import { Keyboard } from './components/Keyboard'
import { useCalculator } from './hooks/useCalculator'

export function App () {
  const calculator = useCalculator()

  return (
    <main className="app-shell">
      <div aria-label="Calculator application" className="calculator-app">
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
