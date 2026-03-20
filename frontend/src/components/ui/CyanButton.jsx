import { useState } from 'react'

export default function CyanButton({ children, onClick, loading, variant = 'primary', style = {}, disabled, type = 'button' }) {
  const [pressed, setPressed] = useState(false)
  const isPrimary = variant === 'primary'
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '13px 24px', borderRadius: 12,
        background: isPrimary ? 'linear-gradient(135deg, #00D4FF 0%, #0088BB 100%)' : 'transparent',
        border: isPrimary ? 'none' : '1px solid rgba(255,255,255,0.12)',
        color: isPrimary ? '#050A14' : '#EAEDFF',
        fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
        boxShadow: isPrimary ? '0 6px 30px rgba(0,212,255,0.35)' : 'none',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'all 0.15s ease',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: loading || disabled ? 0.65 : 1,
        ...style,
      }}
    >
      {loading
        ? <div style={{ width: 16, height: 16, border: '2px solid rgba(5,10,20,0.3)', borderTopColor: '#050A14', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
        : children}
    </button>
  )
}
