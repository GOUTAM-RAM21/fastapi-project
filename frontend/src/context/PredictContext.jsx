import { createContext, useContext, useReducer } from 'react'

const PredictContext = createContext(null)

const initialForm = {
  company: '', year: 2018, owner: '', fuel: '',
  transmission: '', km_driven: '', mileage_mpg: '',
  engine_cc: '', max_power_bhp: '', torque_nm: '',
  seats: 5, seller_type: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FORM': return { ...state, form: { ...state.form, ...action.payload } }
    case 'SET_RESULT': return { ...state, result: action.payload }
    case 'SET_STEP': return { ...state, step: action.payload }
    case 'RESET': return { ...state, form: initialForm, step: 1, result: null }
    default: return state
  }
}

export function PredictProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { form: initialForm, step: 1, result: null })

  const setForm = (data) => dispatch({ type: 'SET_FORM', payload: data })
  const setResult = (r) => dispatch({ type: 'SET_RESULT', payload: r })
  const setStep = (s) => dispatch({ type: 'SET_STEP', payload: s })
  const reset = () => dispatch({ type: 'RESET' })

  return (
    <PredictContext.Provider value={{ ...state, setForm, setResult, setStep, reset }}>
      {children}
    </PredictContext.Provider>
  )
}

export const usePredict = () => useContext(PredictContext)
