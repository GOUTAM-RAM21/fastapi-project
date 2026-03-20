import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', className = '', loading, ...props }) {
  const base = 'px-5 py-3 text-sm font-semibold rounded-xl flex items-center gap-2 justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-xl',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : null}
      {children}
    </motion.button>
  )
}
