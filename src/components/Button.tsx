interface ButtonProps {
  label: string
  onClick: () => void
  ariaLabel?: string
  variant?: 'number' | 'operator' | 'action' | 'equal'
}

export function Button ({ label, onClick, ariaLabel = label, variant = 'number' }: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`calculator-button calculator-button--${variant}`}
      data-testid={`button-${label}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
