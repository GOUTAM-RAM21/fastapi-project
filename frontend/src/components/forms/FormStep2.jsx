import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { step2Schema } from '../../utils/validators'
import { usePredict } from '../../context/PredictContext'
import Button from '../ui/Button'
import Input from '../ui/Input'

const SEATS = [2, 4, 5, 7, 8, 9]

export default function FormStep2({ onNext, onBack }) {
  const { form, setForm } = usePredict()
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      transmission: form.transmission, km_driven: form.km_driven,
      mileage_mpg: form.mileage_mpg, engine_cc: form.engine_cc,
      max_power_bhp: form.max_power_bhp, torque_nm: form.torque_nm, seats: form.seats,
    },
  })

  const transmission = watch('transmission')
  const seats = watch('seats')

  function onSubmit(data) {
    setForm(data)
    onNext()
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      {/* Transmission toggle */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Transmission</label>
        <div className="flex gap-2">
          {['Manual', 'Automatic'].map((t) => (
            <button key={t} type="button" onClick={() => setValue('transmission', t)}
              className={`flex-1 py-3 rounded-xl text-sm border flex items-center justify-center gap-2 transition-all ${transmission === t ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              {t === 'Manual' ? '⚙️' : '🤖'} {t}
            </button>
          ))}
        </div>
        {errors.transmission && <span className="text-xs text-red-400">{errors.transmission.message}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="KM Driven" type="number" placeholder="200000" error={errors.km_driven?.message}
          {...register('km_driven', { valueAsNumber: true })} />
        <Input label="Mileage (MPG)" type="number" placeholder="55" error={errors.mileage_mpg?.message}
          {...register('mileage_mpg', { valueAsNumber: true })} />
        <Input label="Engine (CC)" type="number" placeholder="1250" error={errors.engine_cc?.message}
          {...register('engine_cc', { valueAsNumber: true })} />
        <Input label="Max Power (BHP)" type="number" placeholder="80" error={errors.max_power_bhp?.message}
          {...register('max_power_bhp', { valueAsNumber: true })} />
        <Input label="Torque (Nm)" type="number" placeholder="200" error={errors.torque_nm?.message}
          {...register('torque_nm', { valueAsNumber: true })} />
      </div>

      {/* Seats */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400 font-medium">Seats</label>
        <div className="flex gap-2 flex-wrap">
          {SEATS.map((s) => (
            <button key={s} type="button" onClick={() => setValue('seats', s)}
              className={`w-12 h-12 rounded-xl text-sm border font-bold transition-all ${seats === s ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-white/10 text-slate-400 hover:border-white/20'}`}>
              {s}
            </button>
          ))}
        </div>
        {errors.seats && <span className="text-xs text-red-400">{errors.seats.message}</span>}
      </div>

      <div className="flex gap-3 mt-2">
        <Button type="button" variant="ghost" onClick={onBack} className="flex-1">← Back</Button>
        <Button type="submit" className="flex-1">Next →</Button>
      </div>
    </motion.form>
  )
}
