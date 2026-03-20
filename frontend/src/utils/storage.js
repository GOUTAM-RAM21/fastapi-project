const TOKEN_KEY = 'cv_token'
const APIKEY_KEY = 'cv_apikey'
const AUTH_MODE_KEY = 'cv_auth_mode'
const HISTORY_KEY = 'cv_history'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const getApiKey = () => localStorage.getItem(APIKEY_KEY)
export const setApiKey = (k) => localStorage.setItem(APIKEY_KEY, k)
export const getAuthMode = () => localStorage.getItem(AUTH_MODE_KEY)
export const setAuthMode = (m) => localStorage.setItem(AUTH_MODE_KEY, m)

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(APIKEY_KEY)
  localStorage.removeItem(AUTH_MODE_KEY)
}

export function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [] }
  catch { return [] }
}

export function saveToHistory(entry) {
  const history = getHistory()
  history.unshift({ ...entry, id: Date.now(), date: new Date().toISOString() })
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)))
}

export function deleteFromHistory(id) {
  const history = getHistory().filter((h) => h.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}
