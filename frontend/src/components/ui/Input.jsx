import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs text-slate-400 font-medium">{label}</label>}
    <input
      ref={ref}
      className={`bg-white/5 border ${error ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/20 transition-all ${className}`}
      {...props}
    />
    {error && (
      <span className="text-xs text-red-400 animate-[fadeUp_0.2s_ease]">{error}</span>
    )}
  </div>
))

Input.displayName = 'Input'
export default Input
