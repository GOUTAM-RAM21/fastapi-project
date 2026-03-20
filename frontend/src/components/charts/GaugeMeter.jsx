export default function GaugeMeter({ percent, label }) {
  const clamp = Math.max(0, Math.min(100, percent))
  const angle = -90 + (clamp / 100) * 180
  const color = clamp < 40 ? '#EF4444' : clamp < 70 ? '#FFB347' : '#00D4FF'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 70" className="w-40">
        <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
        <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${(clamp / 100) * 157} 157`} />
        <g transform={`rotate(${angle}, 60, 60)`}>
          <line x1="60" y1="60" x2="60" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="60" cy="60" r="4" fill="white" />
      </svg>
      <span className="text-sm text-slate-400">{label}</span>
    </div>
  )
}
