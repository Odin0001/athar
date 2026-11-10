'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const inputClass =
  'w-full rounded-xl border border-gray-500 bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-mint-leaf transition-colors'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-3xl border border-white/20 bg-gray-900/50 p-8 shadow-2xl shadow-black backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold">Admin Login</h1>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-gray-300">Password</label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-strawberry-red">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-mint-leaf py-3 font-semibold text-prussian-blue transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
