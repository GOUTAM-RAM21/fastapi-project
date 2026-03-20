import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import CyanButton from '../components/ui/CyanButton'
import EmptyState from '../components/ui/EmptyState'
import { useApp } from '../context/AppContext'

function MiniChart({ data }) {
  const prices = data.map(d => d.predicted_price || 0)
  const max = Math.max(...prices), min = Math.min(...prices)
  const W = 320, H = 90
  const norm = prices.map(p => max === min ? 0.5 : (p - min) / (max - min))
  const pts = norm.map((v, i) => `${(i / Math.max(norm.length - 1, 1)) * W},${H - v * (H - 12) - 6}`).join(' ')
  const areaPath = `M0,${H} ` + norm.map((v, i) => `L${(i / Math.max(norm.length - 1, 1)) * W},${H - v * (H - 12) - 6}`).join(' ') + ` L${W},${H} Z`
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d={areaPath} fill="url(#areaGrad)" />
      <polyline points={pts} fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinejoin="round" />
      {norm.map((v, i) => (
        <circle key={i} cx={(i / Math.max(norm.length - 1, 1)) * W} cy={H - v * (H - 12) - 6}
          r="4" fill="#00D4FF" filter="url(#glow)" />
      ))}
    </svg>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { history } = useApp()

  const avgPrice = history.length ? history.reduce((s, h) => s + (h.predicted_price || 0), 0) / history.length : 0
  const topBrand = history.length
    ? Object.entries(history.reduce((a, h) => { a[h.company] = (a[h.company] || 0) + 1; return a }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
    : '—'
  const cacheRate = history.length ? Math.round((history.filter(h => h.cached).length / history.length) * 100) : 0

  const stats = [
    { label: 'Total Predictions', value: history.length, display: String(history.length), color: '#00D4FF', icon: '◈' },
    { label: 'Avg Predicted Price', value: avgPrice, display: `₹${(avgPrice / 100000).toFixed(1)}L`, color: '#FFB347', icon: '◉' },
    { label: 'Top Brand', value: topBrand, display: topBrand, color: '#A78BFA', icon: '◎' },
    { label: 'Cache Hit Rate', value: cacheRate, display: `${cacheRate}%`, color: '#00E5A0', icon: '⚡' },
  ]

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ marginBottom: 8 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: '#EAEDFF' }}>Dashboard</h1>
        <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14, marginTop: 4 }}>Your car price prediction overview</p>
      </div>

      {/* Warning banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, marginBottom: 28,
        background: 'rgba(255,179,71,0.08)', border: '1px solid rgba(255,179,71,0.25)',
        borderRadius: 10, padding: '10px 18px', fontSize: 13, color: '#FFB347',
      }}>
        <span>⚡</span><span>Free tier — API may take ~50s to wake on first request</span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <GlassCard key={s.label} hover style={{ padding: '22px 24px', animation: `slideUp 0.4s ease ${i * 0.1}s both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(234,237,255,0.45)' }}>{s.label}</span>
              <span style={{ fontSize: 20, color: s.color, opacity: 0.8 }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 34, color: s.color }}>{s.display}</div>
            <div style={{ marginTop: 10, height: 2, borderRadius: 1, background: `linear-gradient(to right, ${s.color}, transparent)` }} />
          </GlassCard>
        ))}
      </div>

      {/* CTA */}
      <GlassCard style={{ padding: '24px 28px', marginBottom: 24, borderColor: 'rgba(0,212,255,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: '#EAEDFF', marginBottom: 4 }}>Ready to predict?</h3>
            <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14 }}>Get an instant ML-powered valuation for any used car</p>
          </div>
          <CyanButton onClick={() => navigate('/predict')} style={{ whiteSpace: 'nowrap', padding: '13px 28px', animation: 'glowPulse 3s ease-in-out infinite' }}>
            🚗 Predict New Car Price
          </CyanButton>
        </div>
      </GlassCard>

      {/* Chart + Recent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <GlassCard style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: '#EAEDFF', marginBottom: 20 }}>Price Trend</h3>
          {history.length === 0 ? <EmptyState label="No predictions yet" /> : <MiniChart data={[...history].reverse().slice(0, 10)} />}
        </GlassCard>

        <GlassCard style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: '#EAEDFF', marginBottom: 20 }}>Recent Predictions</h3>
          {history.length === 0 ? <EmptyState label="No predictions yet" sub="Start by predicting a car price!" /> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {history.slice(0, 5).map((h, i) => (
                <div key={h.id || i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,212,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚗</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#EAEDFF' }}>{h.company} · {h.year}</div>
                      <div style={{ fontSize: 11, color: 'rgba(234,237,255,0.35)' }}>{h.fuel} · {Number(h.km_driven).toLocaleString('en-IN')} km</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#00D4FF' }}>
                    ₹{((h.predicted_price || 0) / 100000).toFixed(2)}L
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
