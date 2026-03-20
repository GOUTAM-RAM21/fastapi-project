import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div style={{
      height: 64, background: 'rgba(5,10,20,0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', padding: '0 32px', gap: 16,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,179,71,0.08)', border: '1px solid rgba(255,179,71,0.25)',
        borderRadius: 10, padding: '8px 16px', fontSize: 13, color: '#FFB347',
      }}>
        <span>⚡</span>
        <span>Free tier — API may take ~50s to wake on first request</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10, padding: '6px 14px', cursor: 'pointer',
      }} onClick={handleLogout}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00D4FF, #A78BFA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#050A14',
        }}>U</div>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#EAEDFF' }}>Sign Out</span>
      </div>
    </div>
  )
}
