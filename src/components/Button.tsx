import type { CSSProperties } from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'number' | 'operator' | 'action' | 'equal'
}

const buttonBaseStyle: CSSProperties = {
  minHeight: '64px',
  border: 0,
  borderRadius: '8px',
  color: '#111827',
  cursor: 'pointer',
  fontSize: '1.35rem',
  fontWeight: 700,
  lineHeight: 1,
  padding: '0 12px'
}

const buttonVariantStyles: Record<Required<ButtonProps>['variant'], CSSProperties> = {
  number: {
    background: '#e5e7eb'
  },
  operator: {
    background: '#fbbf24'
  },
  action: {
    background: '#cbd5e1'
  },
  equal: {
    background: '#2f6f73',
    color: '#ffffff'
  }
}

export function Button ({ label, onClick, variant = 'number' }: ButtonProps) {
  return (
    <button
      aria-label={label}
      className={`calculator-button calculator-button--${variant}`}
      data-testid={`button-${label}`}
      style={{ ...buttonBaseStyle, ...buttonVariantStyles[variant] }}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
