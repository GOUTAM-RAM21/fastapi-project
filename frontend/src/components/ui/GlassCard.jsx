import { useState } from 'react'

export default function GlassCard({ children, style = {}, hover = false }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(0,212,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 18,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 40px rgba(0,212,255,0.12)' : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
