const colors = {
  cyan:   { bg: 'rgba(0,212,255,0.12)',   border: 'rgba(0,212,255,0.3)',   text: '#00D4FF' },
  amber:  { bg: 'rgba(255,179,71,0.12)',  border: 'rgba(255,179,71,0.3)',  text: '#FFB347' },
  green:  { bg: 'rgba(0,229,160,0.12)',   border: 'rgba(0,229,160,0.3)',   text: '#00E5A0' },
  purple: { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)', text: '#A78BFA' },
  red:    { bg: 'rgba(255,80,80,0.1)',    border: 'rgba(255,80,80,0.25)',  text: '#FF8080' },
}

export default function Badge({ children, color = 'cyan', style = {} }) {
  const c = colors[color] || colors.cyan
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 12px', borderRadius: 100,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontSize: 12, fontWeight: 600,
      ...style,
    }}>
      {children}
    </span>
  )
}
