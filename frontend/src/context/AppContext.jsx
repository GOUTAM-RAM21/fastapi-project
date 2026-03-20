import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cv_history')) || [] } catch { return [] }
  })
  const [lastResult, setLastResult] = useState(null)

  function addToHistory(entry) {
    const updated = [{ ...entry, id: Date.now(), date: new Date().toISOString() }, ...history].slice(0, 100)
    setHistory(updated)
    localStorage.setItem('cv_history', JSON.stringify(updated))
  }

  function clearHistory() {
    setHistory([])
    localStorage.removeItem('cv_history')
  }

  return (
    <AppContext.Provider value={{ history, addToHistory, clearHistory, lastResult, setLastResult }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
