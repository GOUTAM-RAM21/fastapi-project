import { useNavigate, useLocation } from 'react-router-dom'

const NAV = [
  { path: '/dashboard', icon: '◈', label: 'Dashboard' },
  { path: '/predict',   icon: '◎', label: 'Predict' },
  { path: '/history',   icon: '◷', label: 'History' },
  { path: '/about',     icon: '◉', label: 'About' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div style={{
      width: 220, minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100,
      background: 'rgba(5,10,20,0.96)', backdropFilter: 'blur(30px)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, fontSize: 20,
            background: 'linear-gradient(135deg, #00D4FF, #0066AA)',
            boxShadow: '0 4px 20px rgba(0,212,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🚗</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: '#EAEDFF' }}>CarValue AI</div>
            <div style={{ fontSize: 11, color: 'rgba(234,237,255,0.35)' }}>ML Price Engine</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {NAV.map(item => {
          const active = pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10, marginBottom: 4,
              background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
              borderLeft: `3px solid ${active ? '#00D4FF' : 'transparent'}`,
              color: active ? '#00D4FF' : 'rgba(234,237,255,0.45)',
              fontWeight: 500, fontSize: 14, transition: 'all 0.2s ease', textAlign: 'left',
            }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00D4FF' }} />}
            </button>
          )
        })}
      </nav>

      {/* Status */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 8, height: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0' }} />
            <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: '#00E5A0', opacity: 0.4, animation: 'pulseRing 1.5s ease-out infinite' }} />
          </div>
          <span style={{ fontSize: 12, color: 'rgba(234,237,255,0.45)' }}>API Live</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(234,237,255,0.2)' }}>v2.1</span>
        </div>
      </div>
    </div>
  )
}
