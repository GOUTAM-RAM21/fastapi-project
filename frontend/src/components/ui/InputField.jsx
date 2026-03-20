import { useState } from 'react'

export default function InputField({ label, value, onChange, type = 'text', placeholder, error }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 12, fontWeight: 500, color: 'rgba(234,237,255,0.45)' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: '13px 18px',
          background: focused ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${focused ? '#00D4FF' : error ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 12, color: '#EAEDFF', fontSize: 14,
          boxShadow: focused ? '0 0 0 4px rgba(0,212,255,0.1)' : 'none',
          transition: 'all 0.2s ease',
        }}
      />
      {error && <span style={{ fontSize: 11, color: '#FF8080' }}>{error}</span>}
    </div>
  )
}
