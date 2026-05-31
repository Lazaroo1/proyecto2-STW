import type { CSSProperties } from 'react'

interface DisplayProps {
  value: string
}

const displayStyle: CSSProperties = {
  width: '100%',
  minHeight: '72px',
  borderRadius: '8px',
  background: '#111827',
  color: '#f9fafb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '16px 18px',
  fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  fontSize: '2.5rem',
  fontWeight: 700,
  letterSpacing: '0',
  lineHeight: 1,
  overflow: 'hidden',
  textAlign: 'right'
}

export function Display ({ value }: DisplayProps) {
  return (
    <div
      aria-label="Calculator display"
      className={value === 'ERROR' ? 'display--error' : undefined}
      data-testid="display"
      style={displayStyle}
    >
      {value}
    </div>
  )
}
