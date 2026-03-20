import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { login } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'
import Input from '../ui/Input'
import Button from '../ui/Button'

const schema = z.object({
  username: z.string().min(1, 'Username required'),
  password: z.string().min(1, 'Password required'),
  apiKey: z.string().min(1, 'API key required'),
})

export default function LoginForm() {
  const { loginJWT } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { apiKey: 'demo-key' },
  })

  async function onSubmit({ username, password, apiKey }) {
    setLoading(true)
    try {
      const data = await login(username, password)
      loginJWT(data.access_token, apiKey)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (e) {
      toast.error(e.message || e.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Username" placeholder="admin" error={errors.username?.message} {...register('username')} />
      <Input label="Password" type="password" placeholder="admin" error={errors.password?.message} {...register('password')} />
      <Input label="API Key" placeholder="demo-key" error={errors.apiKey?.message} {...register('apiKey')} />
      <Button type="submit" loading={loading} className="w-full mt-2">Sign In</Button>
    </form>
  )
}
