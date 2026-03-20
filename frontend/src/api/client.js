import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 90000,
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  const apiKey = localStorage.getItem('apiKey')
  if (token) {
    config.headers['token'] = token
    config.headers['api-key'] = localStorage.getItem('apiKey') || ''
  } else if (apiKey) {
    config.headers['api-key'] = apiKey
  }
  return config
})

client.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default client
