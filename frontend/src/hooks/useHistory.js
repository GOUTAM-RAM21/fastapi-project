import { useState, useCallback } from 'react'
import { getHistory, saveToHistory, deleteFromHistory, clearHistory } from '../utils/storage'

export function useHistory() {
  const [history, setHistory] = useState(getHistory)

  const refresh = useCallback(() => setHistory(getHistory()), [])

  const add = useCallback((entry) => {
    saveToHistory(entry)
    refresh()
  }, [refresh])

  const remove = useCallback((id) => {
    deleteFromHistory(id)
    refresh()
  }, [refresh])

  const clear = useCallback(() => {
    clearHistory()
    refresh()
  }, [refresh])

  return { history, add, remove, clear }
}
