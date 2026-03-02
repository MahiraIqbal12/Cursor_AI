'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl text-white font-bold mb-6 text-center">
          Nexus Finance Login
        </h1>

        <input
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 mb-4 text-sm">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 py-2 rounded mb-3"
        >
          Login
        </button>

        <button
          onClick={handleSignup}
          className="w-full border border-emerald-500 py-2 rounded text-white"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}