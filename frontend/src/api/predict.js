import client from './client'

export async function predictPrice(data) {
  const res = await client.post('/predict', data)
  return res.data
}
