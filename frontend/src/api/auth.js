import client from './client'

export async function loginJWT(username, password) {
  const { data } = await client.post('/login', { username, password })
  if (data.error) throw new Error(data.error)
  return data
}

export async function loginApiKey(apiKey) {
  localStorage.setItem('apiKey', apiKey)
  return { access_token: null }
}
