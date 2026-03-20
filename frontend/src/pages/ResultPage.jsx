import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import CyanButton from '../components/ui/CyanButton'
import Badge from '../components/ui/Badge'
import { useApp } from '../context/AppContext'
import { toast } from '../components/ui/Toast'

export default function ResultPage() {
  const navigate = useNavigate()
  const { lastResult } = useApp()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!lastResult) { navigate('/predict'); return }
    let current = 0
    const target = lastResult.predicted_price || 0
    const increment = target / 90
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setDisplay(target); clearInterval(timer); return }
      setDisplay(Math.round(current))
    }, 16)
    return () => clearInterval(timer)
  }, [lastResult])

  if (!lastResult) return null

  const inLakh = (display / 100000).toFixed(2)

  function handleShare() {
    navigator.clipboard.writeText(`CarValue AI: ${lastResult.company} ${lastResult.year} → ₹${(lastResult.predicted_price / 100000).toFixed(2)}L`)
    toast.success('Copied to clipboard!')
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', maxWidth: 680 }}>
      {/* Price reveal */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 72, animation: 'float1 3s ease-in-out infinite', display: 'inline-block', marginBottom: 16 }}>🎯</div>
        <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 15, marginBottom: 16 }}>Estimated Market Value</p>
        <div style={{ animation: 'countUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 80, lineHeight: 1,
            background: 'linear-gradient(135deg, #00D4FF 30%, #FFB347 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>₹{inLakh}L</div>
          <div style={{ color: 'rgba(234,237,255,0.35)', fontSize: 15, marginTop: 8 }}>
            (₹{display.toLocaleString('en-IN')} INR)
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Badge color={lastResult.cached ? 'purple' : 'cyan'}>
            {lastResult.cached ? '⚡ Cached Result' : '🧠 Fresh Prediction'}
          </Badge>
        </div>
      </div>

      {/* Summary */}
      <GlassCard style={{ padding: '28px 32px', marginBottom: 24 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: '#EAEDFF', marginBottom: 20 }}>Vehicle Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            ['Brand', lastResult.company], ['Year', lastResult.year], ['Fuel', lastResult.fuel],
            ['KM Driven', `${Number(lastResult.km_driven).toLocaleString('en-IN')} km`],
            ['Transmission', lastResult.transmission], ['Owner', lastResult.owner],
          ].map(([l, v]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(234,237,255,0.2)', marginBottom: 5 }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#EAEDFF' }}>{v}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <CyanButton onClick={() => navigate('/predict')} style={{ flex: 1 }}>🔁 Predict Another</CyanButton>
        <CyanButton variant="ghost" onClick={() => navigate('/history')} style={{ flex: 1 }}>💾 View History</CyanButton>
        <CyanButton variant="ghost" onClick={handleShare} style={{ flex: 1 }}>📤 Share</CyanButton>
      </div>
    </div>
  )
}
