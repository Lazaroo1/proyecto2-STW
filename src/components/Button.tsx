interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'number' | 'operator' | 'action' | 'equal'
}

export function Button ({ label, onClick, variant = 'number' }: ButtonProps) {
  return (
    <button
      aria-label={label}
      className={`calculator-button calculator-button--${variant}`}
      data-testid={`button-${label}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
