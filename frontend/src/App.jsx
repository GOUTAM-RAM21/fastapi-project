import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Toast } from './components/ui/Toast'
import Layout from './components/layout/Layout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PredictPage from './pages/PredictPage'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import AboutPage from './pages/AboutPage'

function PrivateRoute({ children }) {
  const auth = localStorage.getItem('token') || localStorage.getItem('apiKey')
  return auth ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toast />
        <div className="blob1" /><div className="blob2" /><div className="blob3" /><div className="grid-bg" />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="predict" element={<PredictPage />} />
            <Route path="result" element={<ResultPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
