import axios from 'axios'
import { getToken, getApiKey, clearAuth } from '../utils/storage'

const api = axios.create({
  baseURL: '/api',
  timeout: 90000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  const apiKey = getApiKey()
  if (token) config.headers['token'] = token
  if (apiKey) config.headers['api-key'] = apiKey
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
