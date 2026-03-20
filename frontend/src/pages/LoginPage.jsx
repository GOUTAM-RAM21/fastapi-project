import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import CyanButton from '../components/ui/CyanButton'
import InputField from '../components/ui/InputField'
import { loginJWT, loginApiKey } from '../api/auth'
import { toast } from '../components/ui/Toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('jwt')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [apiKey, setApiKey] = useState('demo-key')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    try {
      if (tab === 'jwt') {
        const data = await loginJWT(username, password)
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('apiKey', apiKey || 'demo-key')
      } else {
        await loginApiKey(apiKey)
      }
      toast.success('Welcome to CarValue AI!')
      navigate('/dashboard')
    } catch (e) {
      toast.error(e.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050A14', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      <div className="blob1" /><div className="blob2" /><div className="blob3" /><div className="grid-bg" />

      {/* Left */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', zIndex: 1 }}>
        <div style={{ animation: 'slideUp 0.8s ease', textAlign: 'center' }}>
          <div style={{ fontSize: 96, animation: 'float1 4s ease-in-out infinite', display: 'inline-block', filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.5))', marginBottom: 16 }}>🚗</div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 48,
            background: 'linear-gradient(135deg, #00D4FF 0%, #A78BFA 50%, #FFB347 100%)',
            backgroundSize: '300% 300%', animation: 'gradientShift 5s ease infinite',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 12,
          }}>CarValue AI</h1>
          <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 16, marginBottom: 40 }}>Predict used car prices with ML precision</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ icon: '🧠', label: 'ML Powered', color: '#A78BFA' }, { icon: '⚡', label: 'Redis Cached', color: '#FFB347' }, { icon: '📊', label: 'Real Analytics', color: '#00D4FF' }].map(f => (
              <div key={f.label} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100, fontSize: 13, color: f.color, fontWeight: 500,
              }}><span>{f.icon}</span>{f.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)', zIndex: 1 }} />

      {/* Right */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 420, animation: 'slideUp 0.8s ease 0.2s both' }}>
          <GlassCard style={{ padding: 44 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 30, color: '#EAEDFF', marginBottom: 6 }}>Welcome back</h2>
            <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14, marginBottom: 32 }}>Sign in to access your dashboard</p>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
              {[['jwt', 'JWT Login'], ['apikey', 'API Key']].map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)} style={{
                  flex: 1, padding: '9px 0', borderRadius: 8,
                  background: tab === key ? 'rgba(0,212,255,0.15)' : 'transparent',
                  borderBottom: `2px solid ${tab === key ? '#00D4FF' : 'transparent'}`,
                  color: tab === key ? '#00D4FF' : 'rgba(234,237,255,0.45)',
                  fontWeight: 600, fontSize: 13, transition: 'all 0.2s ease',
                }}>{label}</button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {tab === 'jwt' ? (
                <>
                  <InputField label="Username" value={username} onChange={setUsername} placeholder="admin" />
                  <InputField label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
                  <InputField label="API Key" value={apiKey} onChange={setApiKey} placeholder="demo-key" />
                </>
              ) : (
                <InputField label="API Key" value={apiKey} onChange={setApiKey} placeholder="demo-key" />
              )}
            </div>

            <CyanButton onClick={handleLogin} loading={loading} style={{
              width: '100%', marginTop: 24, padding: '15px',
              fontSize: 15, animation: 'glowPulse 3s ease-in-out infinite',
            }}>
              <span>Sign In</span><span>→</span>
            </CyanButton>

            <p style={{ marginTop: 16, fontSize: 11, color: 'rgba(234,237,255,0.2)', textAlign: 'center' }}>
              JWT: <span style={{ color: '#00D4FF' }}>admin</span> / <span style={{ color: '#00D4FF' }}>admin</span>
              {' '}· API key: <span style={{ color: '#00D4FF' }}>demo-key</span>
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
