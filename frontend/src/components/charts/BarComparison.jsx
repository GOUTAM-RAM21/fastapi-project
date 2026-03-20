import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function BarComparison({ data }) {
  if (!data?.length) return null
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
        <Tooltip
          contentStyle={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#E2E8F0' }}
          formatter={(v) => [`${v}%`, 'Impact']}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => <Cell key={i} fill={i % 2 === 0 ? '#00D4FF' : '#FFB347'} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
