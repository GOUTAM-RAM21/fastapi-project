import { useState } from 'react'
import { Bell, LogOut, ChevronDown, Sun, Moon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { logout, authMode } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-base/80 backdrop-blur-glass border-b border-border">
      <div className="md:hidden font-heading font-bold text-white">CarValue AI</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl bg-white/5 border border-border flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell size={16} />
        </button>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-border hover:border-cyan/30 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-cyan/20 flex items-center justify-center text-cyan text-xs font-bold">U</div>
            <span className="text-sm text-slate-300 hidden sm:block">{authMode === 'jwt' ? 'JWT User' : 'API User'}</span>
            <ChevronDown size={14} className="text-slate-500" />
          </button>
          {open && (
            <div className="absolute right-0 top-12 w-44 glass rounded-xl overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
