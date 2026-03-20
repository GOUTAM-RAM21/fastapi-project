import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import CyanButton from '../components/ui/CyanButton'
import { predictPrice } from '../api/predict'
import { useApp } from '../context/AppContext'
import { toast } from '../components/ui/Toast'

const BRANDS = ['Maruti','Honda','Hyundai','Toyota','Ford','Tata','Kia','BMW','Mercedes','Audi','Volkswagen','Renault','Nissan','Jeep','MG']
const FUELS = [{ v: 'Petrol', icon: '⛽' }, { v: 'Diesel', icon: '🛢️' }, { v: 'CNG', icon: '💨' }, { v: 'Electric', icon: '⚡' }]
const OWNERS = [{ v: 'First', icon: '👤' }, { v: 'Second', icon: '👥' }, { v: 'Third', icon: '👨‍👩‍👦' }, { v: 'Fourth & Above', icon: '👨‍👩‍👧‍👦' }]
const SEATS = [2, 4, 5, 7]

const label = { fontSize: 12, fontWeight: 500, color: 'rgba(234,237,255,0.45)', display: 'block', marginBottom: 8 }
const numInput = (unit) => ({
  base: { width: '100%', padding: '12px 50px 12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#EAEDFF', fontSize: 14, transition: 'all 0.2s ease' },
  unit,
})

function NumberInput({ label: lbl, value, onChange, unit, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={label}>{lbl}</label>
      <div style={{ position: 'relative' }}>
        <input type="number" value={value} onChange={e => onChange(+e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: '100%', padding: '12px 50px 12px 16px', background: focused ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.05)', border: `1px solid ${focused ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, color: '#EAEDFF', fontSize: 14, transition: 'all 0.2s ease', boxShadow: focused ? '0 0 0 4px rgba(0,212,255,0.1)' : 'none' }} />
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'rgba(234,237,255,0.2)' }}>{unit}</span>
      </div>
    </div>
  )
}

function StepIndicator({ step }) {
  const steps = ['Car Identity', 'Tech Specs', 'Review & Predict']
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, flexShrink: 0, transition: 'all 0.4s ease',
              background: i < step ? '#00D4FF' : 'transparent',
              border: i < step ? 'none' : `${i === step ? '2.5' : '1.5'}px solid ${i === step ? '#00D4FF' : 'rgba(255,255,255,0.15)'}`,
              color: i < step ? '#050A14' : i === step ? '#00D4FF' : 'rgba(234,237,255,0.3)',
              boxShadow: i === step ? '0 0 25px rgba(0,212,255,0.5)' : 'none',
            }}>{i < step ? '✓' : i + 1}</div>
            <span style={{ fontSize: 12, color: i === step ? '#00D4FF' : 'rgba(234,237,255,0.35)', fontWeight: 500, whiteSpace: 'nowrap' }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, margin: '0 16px', transition: 'background 0.5s ease', background: i < step ? 'linear-gradient(to right, #00D4FF, rgba(0,212,255,0.3))' : 'rgba(255,255,255,0.08)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function Step1({ form, update }) {
  const [search, setSearch] = useState('')
  const filtered = BRANDS.filter(b => b.toLowerCase().includes(search.toLowerCase()))
  return (
    <div style={{ animation: 'slideUp 0.3s ease' }}>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#EAEDFF', marginBottom: 4 }}>Car Identity</h3>
      <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 13, marginBottom: 28 }}>Basic information about the vehicle</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Brand */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={label}>Brand / Company</label>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search brand... (${form.company})`}
            style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#EAEDFF', fontSize: 14, marginBottom: 10 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filtered.slice(0, 10).map(b => (
              <button key={b} onClick={() => { update('company', b); setSearch('') }} style={{
                padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                background: form.company === b ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${form.company === b ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`,
                color: form.company === b ? '#00D4FF' : 'rgba(234,237,255,0.45)',
              }}>{b}</button>
            ))}
          </div>
        </div>
        {/* Year */}
        <div>
          <label style={label}>Year of Manufacture</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <input type="range" min="2000" max="2024" value={form.year} onChange={e => update('year', +e.target.value)}
              style={{ flex: 1, accentColor: '#00D4FF', height: 4 }} />
            <div style={{ padding: '8px 14px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#00D4FF', minWidth: 72, textAlign: 'center' }}>{form.year}</div>
          </div>
        </div>
        {/* Owner */}
        <div>
          <label style={label}>Previous Owners</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OWNERS.map(o => (
              <button key={o.v} onClick={() => update('owner', o.v)} style={{
                padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, textAlign: 'left', transition: 'all 0.15s',
                background: form.owner === o.v ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.03)',
                borderLeft: `3px solid ${form.owner === o.v ? '#00D4FF' : 'transparent'}`,
                border: `1px solid ${form.owner === o.v ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
                color: form.owner === o.v ? '#00D4FF' : 'rgba(234,237,255,0.45)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}><span>{o.icon}</span>{o.v}</button>
            ))}
          </div>
        </div>
        {/* Fuel */}
        <div>
          <label style={label}>Fuel Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {FUELS.map(f => (
              <button key={f.v} onClick={() => update('fuel', f.v)} style={{
                padding: '18px 8px', borderRadius: 12, fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                background: form.fuel === f.v ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${form.fuel === f.v ? '#00D4FF' : 'rgba(255,255,255,0.07)'}`,
                color: form.fuel === f.v ? '#00D4FF' : 'rgba(234,237,255,0.45)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                transform: form.fuel === f.v ? 'scale(1.03)' : 'scale(1)',
              }}><span style={{ fontSize: 28 }}>{f.icon}</span>{f.v}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Step2({ form, update }) {
  return (
    <div style={{ animation: 'slideUp 0.3s ease' }}>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#EAEDFF', marginBottom: 4 }}>Technical Specs</h3>
      <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 13, marginBottom: 28 }}>Performance and usage details</p>
      {/* Transmission */}
      <div style={{ marginBottom: 24 }}>
        <label style={label}>Transmission</label>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ v: 'Manual', icon: '⚙️' }, { v: 'Automatic', icon: '🤖' }].map(t => (
            <button key={t.v} onClick={() => update('transmission', t.v)} style={{
              flex: 1, padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
              background: form.transmission === t.v ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.08))' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${form.transmission === t.v ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`,
              color: form.transmission === t.v ? '#00D4FF' : 'rgba(234,237,255,0.45)',
              boxShadow: form.transmission === t.v ? '0 4px 20px rgba(0,212,255,0.2)' : 'none',
              transform: form.transmission === t.v ? 'scale(1.02)' : 'scale(1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}><span style={{ fontSize: 20 }}>{t.icon}</span>{t.v}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <NumberInput label="KM Driven" value={form.km_driven} onChange={v => update('km_driven', v)} unit="km" placeholder="50000" />
        <NumberInput label="Mileage" value={form.mileage_mpg} onChange={v => update('mileage_mpg', v)} unit="mpg" placeholder="55" />
        <NumberInput label="Engine" value={form.engine_cc} onChange={v => update('engine_cc', v)} unit="cc" placeholder="1250" />
        <NumberInput label="Max Power" value={form.max_power_bhp} onChange={v => update('max_power_bhp', v)} unit="bhp" placeholder="80" />
        <NumberInput label="Torque" value={form.torque_nm} onChange={v => update('torque_nm', v)} unit="Nm" placeholder="200" />
        <div>
          <label style={label}>Seats</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {SEATS.map(s => (
              <button key={s} onClick={() => update('seats', s)} style={{
                width: 52, height: 52, borderRadius: 12, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, transition: 'all 0.15s',
                background: form.seats === s ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${form.seats === s ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`,
                color: form.seats === s ? '#00D4FF' : 'rgba(234,237,255,0.45)',
                transform: form.seats === s ? 'scale(1.08)' : 'scale(1)',
              }}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Step3({ form, update }) {
  const fields = [
    ['Brand', form.company], ['Year', form.year], ['Owner', form.owner], ['Fuel', form.fuel],
    ['Transmission', form.transmission], ['KM Driven', `${Number(form.km_driven).toLocaleString('en-IN')} km`],
    ['Mileage', `${form.mileage_mpg} MPG`], ['Engine', `${form.engine_cc} CC`],
    ['Power', `${form.max_power_bhp} BHP`], ['Torque', `${form.torque_nm} Nm`], ['Seats', form.seats],
  ]
  return (
    <div style={{ animation: 'slideUp 0.3s ease' }}>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: '#EAEDFF', marginBottom: 4 }}>Review & Predict</h3>
      <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 13, marginBottom: 20 }}>Confirm details and get your valuation</p>
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '22px 24px', marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px' }}>
        {fields.map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: 11, color: 'rgba(234,237,255,0.2)', marginBottom: 3 }}>{k}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#EAEDFF' }}>{v}</div>
          </div>
        ))}
      </div>
      <div>
        <label style={label}>Seller Type</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Individual', 'Dealer', 'Trustmark Dealer'].map(t => (
            <button key={t} onClick={() => update('seller_type', t)} style={{
              flex: 1, padding: '11px 8px', borderRadius: 10, fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
              background: form.seller_type === t ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${form.seller_type === t ? '#00D4FF' : 'rgba(255,255,255,0.07)'}`,
              color: form.seller_type === t ? '#00D4FF' : 'rgba(234,237,255,0.45)',
            }}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PredictPage() {
  const navigate = useNavigate()
  const { setLastResult, addToHistory } = useApp()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    company: 'Toyota', year: 2018, owner: 'First', fuel: 'Petrol',
    transmission: 'Automatic', km_driven: 50000, mileage_mpg: 55,
    engine_cc: 1250, max_power_bhp: 80, torque_nm: 200, seats: 5, seller_type: 'Individual',
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handlePredict() {
    setLoading(true)
    try {
      const payload = { ...form, km_driven: Number(form.km_driven), mileage_mpg: Number(form.mileage_mpg), engine_cc: Number(form.engine_cc), max_power_bhp: Number(form.max_power_bhp), torque_nm: Number(form.torque_nm), seats: Number(form.seats), year: Number(form.year) }
      const data = await predictPrice(payload)
      const price = parseFloat(String(data.predicted_price).replace(/,/g, ''))
      const result = { ...form, predicted_price: price, cached: data.cached || false }
      setLastResult(result)
      addToHistory(result)
      navigate('/result')
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Prediction failed. Check API connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', maxWidth: 720 }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: '#EAEDFF', marginBottom: 6 }}>Get Your Car's Value</h1>
      <p style={{ color: 'rgba(234,237,255,0.45)', fontSize: 14, marginBottom: 36 }}>Fill in the details for an instant ML-powered price estimate</p>
      <StepIndicator step={step} />
      <GlassCard style={{ padding: '36px 32px' }}>
        {step === 0 && <Step1 form={form} update={update} />}
        {step === 1 && <Step2 form={form} update={update} />}
        {step === 2 && <Step3 form={form} update={update} />}
        <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {step > 0 && <CyanButton variant="ghost" onClick={() => setStep(s => s - 1)} style={{ flex: 1 }}>← Back</CyanButton>}
          {step < 2
            ? <CyanButton onClick={() => setStep(s => s + 1)} style={{ flex: 2 }}>Continue →</CyanButton>
            : <CyanButton onClick={handlePredict} loading={loading} style={{ flex: 2, padding: 16, fontSize: 16, animation: 'glowPulse 2s ease-in-out infinite' }}>🔮 Predict Price</CyanButton>
          }
        </div>
      </GlassCard>
    </div>
  )
}
