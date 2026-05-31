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

const rowOperators = ['*', '-', '+']

const operatorLabels: Record<string, string> = {
  '+': 'Add',
  '-': 'Subtract',
  '*': 'Multiply',
  '/': 'Divide',
  '%': 'Modulo'
}

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
      <Button ariaLabel="Clear" label="C" variant="action" onClick={onClear} />
      <Button ariaLabel="Toggle sign" label="+/-" variant="action" onClick={onToggleSign} />
      <Button ariaLabel={operatorLabels['%']} label="%" variant="operator" onClick={() => onOperator('%')} />
      <Button ariaLabel={operatorLabels['/']} label="/" variant="operator" onClick={() => onOperator('/')} />

      {digitRows.map((row, rowIndex) =>
        row.map(digit => (
          <Button key={digit} ariaLabel={`Digit ${digit}`} label={digit} onClick={() => onDigit(digit)} />
        )).concat(
          <Button
            key={`operator-${rowIndex}`}
            ariaLabel={operatorLabels[rowOperators[rowIndex]]}
            label={rowOperators[rowIndex]}
            variant="operator"
            onClick={() => onOperator(rowOperators[rowIndex])}
          />
        )
      )}

      <Button ariaLabel="Digit 0" label="0" onClick={() => onDigit('0')} />
      <Button ariaLabel="Decimal point" label="." onClick={onDecimal} />
      <Button ariaLabel="Calculate" label="=" variant="equal" onClick={onCalculate} />
    </div>
  )
}
