import api from './axios'

export async function checkHealth() {
  const { data } = await api.get('/openapi.json')
  return data
}
