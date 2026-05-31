interface DisplayProps {
  value: string
}

export function Display ({ value }: DisplayProps) {
  return (
    <div
      aria-label="Calculator display"
      className={value === 'ERROR' ? 'calculator-display display--error' : 'calculator-display'}
      data-testid="display"
    >
      {value}
    </div>
  )
}
