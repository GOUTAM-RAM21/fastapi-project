export function formatINR(value) {
  if (!value && value !== 0) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatKM(value) {
  if (!value && value !== 0) return '—'
  return new Intl.NumberFormat('en-IN').format(value) + ' km'
}
