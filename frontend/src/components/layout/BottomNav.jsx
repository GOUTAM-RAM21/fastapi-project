import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Brain, History, Info } from 'lucide-react'

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { to: '/predict',   icon: Brain,           label: 'Predict' },
  { to: '/history',   icon: History,         label: 'History' },
  { to: '/about',     icon: Info,            label: 'About' },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-glass border-t border-border flex">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
              isActive ? 'text-cyan' : 'text-slate-500'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
