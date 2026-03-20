export default function EmptyState({ label = 'No data yet', sub = '' }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12, animation: 'float1 3s ease-in-out infinite', display: 'inline-block' }}>🚗</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(234,237,255,0.45)', marginBottom: 6 }}>{label}</div>
      {sub && <div style={{ fontSize: 13, color: 'rgba(234,237,255,0.2)' }}>{sub}</div>}
    </div>
  )
}
