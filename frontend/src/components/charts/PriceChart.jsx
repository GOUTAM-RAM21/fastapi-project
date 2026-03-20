import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { formatINR } from '../../utils/formatCurrency'

export default function PriceChart({ data }) {
  if (!data?.length) return (
    <div className="flex items-center justify-center h-40 text-slate-500 text-sm">No data yet</div>
  )
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
        <Tooltip
          contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#E2E8F0' }}
          formatter={(v) => [formatINR(v), 'Price']}
        />
        <Area type="monotone" dataKey="price" stroke="#00D4FF" strokeWidth={2} fill="url(#priceGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
