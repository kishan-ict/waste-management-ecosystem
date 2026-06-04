'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Recycle, Eye, EyeOff, ArrowLeft, Zap, Shield, Factory, Users } from 'lucide-react'

const ROLES = [
  { id: 'kabadiwala', label: 'Kabadiwala', icon: Users, color: '#FFB800', desc: 'Collection center / broker' },
  { id: 'industry',   label: 'Industry',   icon: Factory, color: '#00FFD1', desc: 'Recycling manufacturer' },
  { id: 'admin',      label: 'Admin',      icon: Shield,  color: '#B5FF5A', desc: 'Platform administrator' },
]

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') || 'kabadiwala'

  const [role, setRole]         = useState(defaultRole)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const DEMO_CREDENTIALS: Record<string, { email: string; password: string }> = {
    kabadiwala: { email: 'kabadiwala@greenpack.in', password: 'demo@123' },
    industry:   { email: 'industry@greenpack.in',   password: 'demo@123' },
    admin:      { email: 'admin@greenpack.in',       password: 'admin@123' },
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200))
    const creds = DEMO_CREDENTIALS[role]
    if (email === creds.email && password === creds.password) {
      router.push(`/dashboard/${role}`)
    } else {
      setError('Invalid credentials. Use the demo credentials below.')
    }
    setLoading(false)
  }

  const fillDemo = () => {
    const creds = DEMO_CREDENTIALS[role]
    setEmail(creds.email)
    setPassword(creds.password)
  }

  const selectedRole = ROLES.find(r => r.id === role)!

  return (
    <div className="min-h-screen bg-gp-dark grid-overlay flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
        style={{ background: `${selectedRole.color}08` }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-neon-lime mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Card */}
        <div className="gp-card p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gp-gradient rounded-xl flex items-center justify-center">
              <Recycle className="w-5 h-5 text-neon-lime" />
            </div>
            <span className="font-display font-bold text-xl">
              <span className="gradient-text">GREEN</span><span className="text-white/80">PACK</span>
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl text-white mb-2">Welcome back</h1>
          <p className="text-white/40 text-sm mb-8">Sign in to your GREENPACK account</p>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-white/50 mb-3 block font-mono tracking-widest">SELECT ROLE</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className="p-3 rounded-xl text-center transition-all border"
                  style={{
                    background: role === r.id ? `${r.color}18` : 'rgba(84,106,47,0.06)',
                    borderColor: role === r.id ? `${r.color}50` : 'rgba(84,106,47,0.2)',
                    boxShadow: role === r.id ? `0 0 12px ${r.color}15` : 'none',
                  }}
                >
                  <r.icon className="w-5 h-5 mx-auto mb-1" style={{ color: r.color }} />
                  <div className="text-xs font-semibold text-white/70">{r.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="gp-input"
                placeholder="you@greenpack.in"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="gp-input pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-neon-lime/30 border-t-neon-lime rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Sign In as {selectedRole.label}
                </span>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(84,106,47,0.08)', border: '1px dashed rgba(84,106,47,0.3)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-white/30">DEMO CREDENTIALS</span>
              <button onClick={fillDemo} className="text-xs text-neon-lime hover:underline">Auto-fill</button>
            </div>
            <div className="font-mono text-xs text-white/50 space-y-1">
              <div>Email: <span className="text-neon-lime">{DEMO_CREDENTIALS[role].email}</span></div>
              <div>Password: <span className="text-neon-lime">{DEMO_CREDENTIALS[role].password}</span></div>
            </div>
          </div>

          <p className="text-center text-sm text-white/40 mt-6">
            New to GREENPACK?{' '}
            <Link href="/auth/register" className="text-neon-lime hover:underline">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gp-dark flex items-center justify-center"><div className="w-8 h-8 border-2 border-neon-lime/30 border-t-neon-lime rounded-full animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
