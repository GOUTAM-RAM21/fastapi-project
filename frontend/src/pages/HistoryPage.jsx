import GlassCard from '../components/ui/GlassCard'
import CyanButton from '../components/ui/CyanButton'
import EmptyState from '../components/ui/EmptyState'
import { useApp } from '../context/AppContext'

export default function HistoryPage() {
  const { history, clearHistory } = useApp()

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: '#EAEDFF' }}>History</h1>
          <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14, marginTop: 4 }}>{history.length} total predictions</p>
        </div>
        {history.length > 0 && (
          <CyanButton variant="ghost" onClick={() => { if (confirm('Clear all history?')) clearHistory() }}
            style={{ border: '1px solid rgba(255,80,80,0.3)', color: '#FF8080' }}>
            Clear All
          </CyanButton>
        )}
      </div>

      {history.length === 0 ? (
        <GlassCard style={{ padding: 60 }}>
          <EmptyState label="No predictions yet" sub="Go to Predict to get started!" />
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {history.map((h, i) => (
            <GlassCard key={h.id || i} hover style={{ padding: '20px 24px', animation: `slideUp 0.3s ease ${i * 0.05}s both` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🚗</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: '#EAEDFF' }}>{h.company} · {h.year}</div>
                    <div style={{ fontSize: 12, color: 'rgba(234,237,255,0.35)', marginTop: 3 }}>
                      {h.fuel} · {h.transmission} · {Number(h.km_driven).toLocaleString('en-IN')} km · {h.owner} owner
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: '#00D4FF' }}>
                    ₹{((h.predicted_price || 0) / 100000).toFixed(2)}L
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(234,237,255,0.2)', marginTop: 2 }}>
                    ₹{(h.predicted_price || 0).toLocaleString('en-IN')} INR
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
