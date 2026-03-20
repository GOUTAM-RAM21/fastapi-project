import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { usePredict } from '../../context/PredictContext'
import { predictPrice } from '../../api/predict'
import Button from '../ui/Button'
import { formatINR, formatKM } from '../../utils/formatCurrency'

const SUMMARY_FIELDS = [
  ['Brand', 'company'], ['Year', 'year'], ['Owner', 'owner'], ['Fuel', 'fuel'],
  ['Transmission', 'transmission'], ['KM Driven', 'km_driven', formatKM],
  ['Mileage', 'mileage_mpg', (v) => `${v} MPG`], ['Engine', 'engine_cc', (v) => `${v} CC`],
  ['Power', 'max_power_bhp', (v) => `${v} BHP`], ['Torque', 'torque_nm', (v) => `${v} Nm`],
  ['Seats', 'seats'], ['Seller', 'seller_type'],
]

export default function FormStep3({ onBack }) {
  const { form, setForm, setResult } = usePredict()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [sellerType, setSellerType] = useState(form.seller_type || '')

  async function handlePredict() {
    if (!sellerType) return toast.error('Please select seller type')
    const payload = { ...form, seller_type: sellerType,
      km_driven: Number(form.km_driven), mileage_mpg: Number(form.mileage_mpg),
      engine_cc: Number(form.engine_cc), max_power_bhp: Number(form.max_power_bhp),
      torque_nm: Number(form.torque_nm), seats: Number(form.seats), year: Number(form.year),
    }
    setLoading(true)
    try {
      setForm({ seller_type: sellerType })
      const result = await predictPrice(payload)
      setResult(result)
      navigate('/result')
    } catch (e) {
      toast.error(e.response?.data?.detail || 'Prediction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      className="flex flex-col gap-6"
    >
      {/* Summary */}
      <div className="glass p-5 rounded-2xl">
        <h3 className="font-heading font-semibold text-white mb-4">Review Your Details</h3>
        <div className="grid grid-cols-2 gap-3">
          {SUMMARY_FIELDS.filter(([, key]) => key !== 'seller_type').map(([label, key, fmt]) => (
            <div key={key}>
              <div className="text-xs text-slate-500">{label}</div>
              <div className="text-sm text-white font-medium">{fmt ? fmt(form[key]) : form[key] || '—'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Seller type */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Seller Type</label>
        <div className="flex gap-3">
          {['Individual', 'Dealer', 'Trustmark Dealer'].map((s) => (
            <button key={s} type="button" onClick={() => setSellerType(s)}
              className={`flex-1 py-3 rounded-xl text-sm border transition-all ${sellerType === s ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">← Back</Button>
        <Button onClick={handlePredict} loading={loading} className="flex-1 text-base py-4">
          🔮 Predict Price
        </Button>
      </div>
    </motion.div>
  )
}
