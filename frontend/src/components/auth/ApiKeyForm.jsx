import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginWithApiKey } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function ApiKeyForm() {
  const { loginAPI } = useAuth()
  const navigate = useNavigate()
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!key.trim()) return toast.error('API key is required')
    setLoading(true)
    try {
      await loginWithApiKey(key.trim())
      loginAPI(key.trim())
      toast.success('Authenticated!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid API key')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="API Key"
        placeholder="demo-key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button type="submit" loading={loading} className="w-full mt-2">Authenticate</Button>
    </form>
  )
}
