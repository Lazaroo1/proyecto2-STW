import { Button } from './Button'

interface KeyboardProps {
  onDigit: (d: string) => void
  onOperator: (op: string) => void
  onCalculate: () => void
  onClear: () => void
  onDecimal: () => void
  onToggleSign: () => void
}

const digitRows = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3']
]

export function Keyboard ({
  onDigit,
  onOperator,
  onCalculate,
  onClear,
  onDecimal,
  onToggleSign
}: KeyboardProps) {
  return (
    <div aria-label="Calculator keyboard" className="calculator-keyboard" role="group">
      <Button label="C" variant="action" onClick={onClear} />
      <Button label="+/-" variant="action" onClick={onToggleSign} />
      <Button label="%" variant="operator" onClick={() => onOperator('%')} />
      <Button label="/" variant="operator" onClick={() => onOperator('/')} />

      {digitRows.map((row, rowIndex) =>
        row.map(digit => (
          <Button key={digit} label={digit} onClick={() => onDigit(digit)} />
        )).concat(
          <Button
            key={`operator-${rowIndex}`}
            label={['*', '-', '+'][rowIndex]}
            variant="operator"
            onClick={() => onOperator(['*', '-', '+'][rowIndex])}
          />
        )
      )}

      <Button label="0" onClick={() => onDigit('0')} />
      <Button label="." variant="action" onClick={onDecimal} />
      <Button label="=" variant="equal" onClick={onCalculate} />
    </div>
  )
}
