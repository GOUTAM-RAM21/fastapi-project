import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass p-6 ${hover ? 'hover:border-cyan/25' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
