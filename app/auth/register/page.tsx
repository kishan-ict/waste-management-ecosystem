'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Recycle, ArrowLeft, Eye, EyeOff, Users, Factory, Shield,
  User, Mail, Lock, Phone, MapPin, Building2, CheckCircle
} from 'lucide-react'

const ROLES = [
  { id: 'kabadiwala', label: 'Kabadiwala', icon: Users,   color: '#FFB800', desc: 'Collection center / Broker' },
  { id: 'industry',   label: 'Industry',   icon: Factory, color: '#00FFD1', desc: 'Recycling Manufacturer' },
]

function RegisterContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [role, setRole]       = useState(searchParams.get('role') || 'kabadiwala')
  const [step, setStep]       = useState(1)
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm]       = useState({
    name: '', email: '', phone: '', password: '', confirm: '',
    organization: '', city: '', state: '', gstin: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const selectedRole = ROLES.find(r => r.id === role)!

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) { setStep(2); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    router.push(`/dashboard/${role}`)
  }

  return (
    <div className="min-h-screen bg-gp-dark grid-overlay flex items-center justify-center px-4 py-16">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
        style={{ background: `${selectedRole.color}06` }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-neon-lime mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="gp-card p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gp-gradient rounded-xl flex items-center justify-center">
              <Recycle className="w-5 h-5 text-neon-lime" />
            </div>
            <div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">GREEN</span><span className="text-white/80">PACK</span>
              </span>
              <div className="text-xs text-white/30">Create your account</div>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-3 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all"
                  style={{
                    background: step >= s ? selectedRole.color : 'rgba(84,106,47,0.1)',
                    borderColor: step >= s ? selectedRole.color : 'rgba(84,106,47,0.3)',
                    color: step >= s ? '#0D1208' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className="text-xs text-white/40">{s === 1 ? 'Account Info' : 'Organization'}</span>
                {s < 2 && <div className="flex-1 h-px bg-gp-800/50" />}
              </div>
            ))}
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-white/50 mb-3 block font-mono tracking-widest">I AM A</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className="p-4 rounded-xl text-left transition-all border"
                  style={{
                    background: role === r.id ? `${r.color}15` : 'rgba(84,106,47,0.06)',
                    borderColor: role === r.id ? `${r.color}50` : 'rgba(84,106,47,0.2)',
                  }}
                >
                  <r.icon className="w-6 h-6 mb-2" style={{ color: r.color }} />
                  <div className="text-sm font-semibold text-white/80">{r.label}</div>
                  <div className="text-xs text-white/40">{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input className="gp-input" placeholder="Rajesh Kumar" value={form.name} onChange={set('name')} required />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Email Address
                  </label>
                  <input type="email" className="gp-input" placeholder="you@company.in" value={form.email} onChange={set('email')} required />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Mobile Number
                  </label>
                  <input className="gp-input" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} required />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      className="gp-input pr-10"
                      placeholder="Minimum 8 characters"
                      value={form.password}
                      onChange={set('password')}
                      required
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {role === 'industry' ? 'Company Name' : 'Business Name'}
                  </label>
                  <input className="gp-input" placeholder="Your Organization" value={form.organization} onChange={set('organization')} required />
                </div>
                {role === 'industry' && (
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1.5 block">GSTIN</label>
                    <input className="gp-input font-mono" placeholder="27AAPFU0939F1ZV" value={form.gstin} onChange={set('gstin')} />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1.5 block flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> City
                    </label>
                    <input className="gp-input" placeholder="Bengaluru" value={form.city} onChange={set('city')} required />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1.5 block">State</label>
                    <select className="gp-input" value={form.state} onChange={set('state')} required>
                      <option value="">Select state</option>
                      {['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Gujarat', 'Rajasthan', 'Delhi', 'West Bengal'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 mt-4">
                  <input type="checkbox" id="terms" className="mt-1 rounded accent-neon-lime" required />
                  <label htmlFor="terms" className="text-xs text-white/40">
                    I agree to GREENPACK's{' '}
                    <a href="#" className="text-neon-lime hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-neon-lime hover:underline">Privacy Policy</a>.
                    My data will be used to build ecosystem trust scores.
                  </label>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm mt-4"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-neon-lime/30 border-t-neon-lime rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : step === 1 ? 'Continue →' : 'Create Account'}
            </button>

            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}
                className="w-full text-sm text-white/40 hover:text-white/60 py-2">
                ← Back
              </button>
            )}
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-neon-lime hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gp-dark flex items-center justify-center"><div className="w-8 h-8 border-2 border-neon-lime/30 border-t-neon-lime rounded-full animate-spin" /></div>}>
      <RegisterContent />
    </Suspense>
  )
}
