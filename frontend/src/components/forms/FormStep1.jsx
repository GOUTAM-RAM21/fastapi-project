import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { step1Schema } from '../../utils/validators'
import { usePredict } from '../../context/PredictContext'
import Button from '../ui/Button'
import Input from '../ui/Input'

const BRANDS = ['Maruti', 'Honda', 'Hyundai', 'Toyota', 'Ford', 'Tata', 'Mahindra', 'Volkswagen', 'BMW', 'Audi', 'Kia', 'MG', 'Renault', 'Nissan', 'Skoda']
const OWNERS = ['First', 'Second', 'Third', 'Fourth & Above']
const FUELS = [
  { value: 'Petrol', icon: '⛽' },
  { value: 'Diesel', icon: '🛢️' },
  { value: 'CNG', icon: '🔵' },
  { value: 'Electric', icon: '⚡' },
]

export default function FormStep1({ onNext }) {
  const { form, setForm } = usePredict()
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: { company: form.company, year: form.year, owner: form.owner, fuel: form.fuel },
  })

  const year = watch('year')
  const fuel = watch('fuel')
  const owner = watch('owner')

  function onSubmit(data) {
    setForm(data)
    onNext()
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {/* Brand */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-400 font-medium">Car Brand</label>
        <select
          {...register('company')}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan/60 transition-all"
        >
          <option value="">Select brand...</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors.company && <span className="text-xs text-red-400">{errors.company.message}</span>}
      </div>

      {/* Year slider */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Year of Manufacture — <span className="text-cyan font-bold">{year}</span></label>
        <input type="range" min={2000} max={2024} {...register('year', { valueAsNumber: true })}
          className="w-full accent-cyan h-2 rounded-full" />
        <div className="flex justify-between text-xs text-slate-500"><span>2000</span><span>2024</span></div>
      </div>

      {/* Owner */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Previous Owners</label>
        <div className="grid grid-cols-2 gap-2">
          {OWNERS.map((o) => (
            <button key={o} type="button" onClick={() => setValue('owner', o)}
              className={`py-2.5 px-3 rounded-xl text-sm border transition-all ${owner === o ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              {o}
            </button>
          ))}
        </div>
        {errors.owner && <span className="text-xs text-red-400">{errors.owner.message}</span>}
      </div>

      {/* Fuel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Fuel Type</label>
        <div className="grid grid-cols-2 gap-2">
          {FUELS.map(({ value, icon }) => (
            <button key={value} type="button" onClick={() => setValue('fuel', value)}
              className={`py-3 px-4 rounded-xl text-sm border flex items-center gap-2 transition-all ${fuel === value ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              <span>{icon}</span> {value}
            </button>
          ))}
        </div>
        {errors.fuel && <span className="text-xs text-red-400">{errors.fuel.message}</span>}
      </div>

      <Button type="submit" className="w-full mt-2">Next →</Button>
    </motion.form>
  )
}
