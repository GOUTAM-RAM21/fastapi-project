import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, getApiKey, getAuthMode, setToken, setApiKey, setAuthMode, clearAuth } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(getToken)
  const [apiKey, setApiKeyState] = useState(getApiKey)
  const [authMode, setAuthModeState] = useState(getAuthMode)

  const isAuthenticated = !!(token || apiKey)

  function loginJWT(t, k) {
    setToken(t)
    setTokenState(t)
    setApiKey(k)
    setApiKeyState(k)
    setAuthMode('jwt')
    setAuthModeState('jwt')
  }

  function loginAPI(k) {
    setApiKey(k)
    setApiKeyState(k)
    setAuthMode('apikey')
    setAuthModeState('apikey')
  }

  function logout() {
    clearAuth()
    setTokenState(null)
    setApiKeyState(null)
    setAuthModeState(null)
  }

  return (
    <AuthContext.Provider value={{ token, apiKey, authMode, isAuthenticated, loginJWT, loginAPI, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
