import { motion } from 'framer-motion'

export default function StepProgress({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center gap-2 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              step < current ? 'bg-cyan border-cyan text-base' :
              step === current ? 'border-cyan text-cyan' :
              'border-white/10 text-slate-500'
            }`}>
              {step < current ? '✓' : step}
            </div>
            {step < total && (
              <div className="flex-1 h-0.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: step < current ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
