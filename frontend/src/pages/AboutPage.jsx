import { useEffect, useState } from 'react'
import GlassCard from '../components/ui/GlassCard'
import client from '../api/client'

const STACK = [
  { name: 'FastAPI', desc: 'Python web framework', color: '#00D4FF' },
  { name: 'scikit-learn', desc: 'ML model training', color: '#A78BFA' },
  { name: 'Redis', desc: 'Response caching', color: '#FFB347' },
  { name: 'Prometheus', desc: 'Metrics collection', color: '#00E5A0' },
  { name: 'Docker', desc: 'Containerisation', color: '#00D4FF' },
  { name: 'Render', desc: 'Cloud deployment', color: '#FFB347' },
]

const LINKS = [
  { label: 'Live API', url: 'https://fastapi-project-ybry.onrender.com' },
  { label: 'Swagger Docs', url: 'https://fastapi-project-ybry.onrender.com/docs' },
  { label: 'Metrics', url: 'https://fastapi-project-ybry.onrender.com/metrics' },
]

export default function AboutPage() {
  const [status, setStatus] = useState('checking')

  async function ping() {
    setStatus('checking')
    try { await client.get('/openapi.json'); setStatus('online') }
    catch { setStatus('offline') }
  }

  useEffect(() => { ping(); const t = setInterval(ping, 30000); return () => clearInterval(t) }, [])

  const statusColor = { online: '#00E5A0', offline: '#FF8080', checking: '#FFB347' }
  const statusLabel = { online: 'API Online', offline: 'API Offline', checking: 'Checking...' }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: 720 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: '#EAEDFF' }}>About</h1>
        <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14, marginTop: 4 }}>CarValue AI — ML-powered used car valuation</p>
      </div>

      {/* Status */}
      <GlassCard style={{ padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', width: 10, height: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: statusColor[status] }} />
              {status === 'online' && <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: statusColor[status], opacity: 0.4, animation: 'pulseRing 1.5s ease-out infinite' }} />}
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: '#EAEDFF' }}>{statusLabel[status]}</span>
          </div>
          <button onClick={ping} style={{ fontSize: 12, color: '#00D4FF', cursor: 'pointer' }}>Refresh</button>
        </div>
      </GlassCard>

      {/* Stack */}
      <GlassCard style={{ padding: '24px 28px', marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: '#EAEDFF', marginBottom: 16 }}>Tech Stack</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {STACK.map(s => (
            <div key={s.name} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: s.color }}>{s.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(234,237,255,0.35)', marginTop: 4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Links */}
      <GlassCard style={{ padding: '24px 28px' }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: '#EAEDFF', marginBottom: 16 }}>API Links</h3>
        {LINKS.map((l, i) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '13px 0', borderBottom: i < LINKS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            color: '#EAEDFF', fontSize: 14,
          }}>
            <span style={{ fontWeight: 500 }}>{l.label}</span>
            <span style={{ color: '#00D4FF', fontSize: 12 }}>{l.url.replace('https://', '')} →</span>
          </a>
        ))}
      </GlassCard>
    </div>
  )
}
