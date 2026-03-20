import { useState, useEffect } from 'react'

let addToast = () => {}

export function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    addToast = (msg, type = 'success') => {
      const id = Date.now()
      setToasts(t => [...t, { id, msg, type }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: '12px 18px', borderRadius: 12, fontSize: 13, fontWeight: 500,
          background: t.type === 'error' ? 'rgba(255,80,80,0.15)' : 'rgba(0,229,160,0.15)',
          border: `1px solid ${t.type === 'error' ? 'rgba(255,80,80,0.3)' : 'rgba(0,229,160,0.3)'}`,
          color: t.type === 'error' ? '#FF8080' : '#00E5A0',
          backdropFilter: 'blur(20px)', animation: 'slideUp 0.3s ease',
          maxWidth: 320,
        }}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}

export const toast = {
  success: (msg) => addToast(msg, 'success'),
  error: (msg) => addToast(msg, 'error'),
}
