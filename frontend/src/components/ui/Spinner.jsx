export default function Spinner({ size = 20, color = '#050A14' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `2px solid ${color === '#050A14' ? 'rgba(5,10,20,0.25)' : 'rgba(0,212,255,0.2)'}`,
      borderTopColor: color,
      animation: 'spin 0.6s linear infinite',
    }} />
  )
}
