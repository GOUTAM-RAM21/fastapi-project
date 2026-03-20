import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10 gap-6 text-center px-4">
      <motion.div
        animate={{ x: [0, 300, 300] }}
        transition={{ duration: 3, ease: 'easeInOut', delay: 1 }}
      >
        <svg viewBox="0 0 200 120" className="w-48">
          <rect x="20" y="60" width="160" height="35" rx="8" fill="rgba(0,212,255,0.2)" stroke="#00D4FF" strokeWidth="1.5" />
          <rect x="45" y="42" width="110" height="35" rx="10" fill="rgba(0,212,255,0.15)" stroke="#00D4FF" strokeWidth="1.5" />
          <circle cx="55" cy="97" r="14" fill="#1E293B" stroke="#00D4FF" strokeWidth="2.5" />
          <circle cx="55" cy="97" r="6" fill="#0A0F1E" />
          <circle cx="145" cy="97" r="14" fill="#1E293B" stroke="#00D4FF" strokeWidth="2.5" />
          <circle cx="145" cy="97" r="6" fill="#0A0F1E" />
          <ellipse cx="178" cy="74" rx="6" ry="5" fill="#FFB347" opacity="0.8" />
        </svg>
      </motion.div>
      <div>
        <h1 className="font-heading text-6xl font-bold text-cyan mb-2">404</h1>
        <p className="font-heading text-xl text-white mb-2">Page Not Found</p>
        <p className="text-slate-400 text-sm">Looks like this car drove off the map</p>
      </div>
      <Button onClick={() => navigate('/dashboard')}>← Back to Dashboard</Button>
    </div>
  )
}
