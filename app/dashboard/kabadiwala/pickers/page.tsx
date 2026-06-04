'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Filter, Star, MapPin, Phone, Recycle, Eye,
  TrendingUp, CheckCircle, Camera, X, User, Package
} from 'lucide-react'

const PICKERS = [
  { id: 'GP-001', name: 'Ramesh Yadav',     area: 'Andheri West',   specialization: ['Plastic', 'Metal'], avg: 42, trust: 94, badge: 'GOLD',   registered: '2023-01-15', totalKg: 18420, phone: '+91 98234 56789' },
  { id: 'GP-002', name: 'Sunita Devi',      area: 'Kurla East',     specialization: ['Paper', 'Plastic'],  avg: 38, trust: 91, badge: 'GOLD',   registered: '2023-03-22', totalKg: 15680, phone: '+91 97123 45678' },
  { id: 'GP-003', name: 'Manoj Gupta',      area: 'Dharavi',        specialization: ['E-Waste', 'Metal'],  avg: 35, trust: 88, badge: 'SILVER', registered: '2023-06-10', totalKg: 12940, phone: '+91 96012 34567' },
  { id: 'GP-004', name: 'Priya Sharma',     area: 'Bandra',         specialization: ['Organic', 'Paper'],  avg: 30, trust: 85, badge: 'SILVER', registered: '2023-08-05', totalKg: 10380, phone: '+91 95901 23456' },
  { id: 'GP-005', name: 'Deepak Kamble',    area: 'Chembur',        specialization: ['Plastic'],           avg: 28, trust: 79, badge: 'BRONZE', registered: '2024-01-10', totalKg: 7290,  phone: '+91 94890 12345' },
  { id: 'GP-006', name: 'Lakshmi Bai',      area: 'Malad West',     specialization: ['Paper', 'Organic'],  avg: 25, trust: 76, badge: 'BRONZE', registered: '2024-02-14', totalKg: 5640,  phone: '+91 93789 01234' },
]

const WASTE_COLORS: Record<string, string> = {
  Plastic: '#39FF14', Paper: '#FFB800', Metal: '#00FFD1',
  'E-Waste': '#B5FF5A', Organic: '#A78BFA',
}

const BADGE_COLORS: Record<string, string> = {
  GOLD: '#FFB800', SILVER: '#C0C0C0', BRONZE: '#CD7F32',
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', area: '', phone: '', specialization: [] as string[], avg: '',
  })

  const toggleSpec = (s: string) =>
    setForm(f => ({
      ...f,
      specialization: f.specialization.includes(s)
        ? f.specialization.filter(x => x !== s)
        : [...f.specialization, s],
    }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="gp-card p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-white">Register Waste Picker</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Steps */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 h-1 rounded-full" style={{ background: step >= s ? '#39FF14' : 'rgba(84,106,47,0.2)' }} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-white/50 mb-4">Step 1: Basic Information</p>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Picker Full Name *</label>
              <input className="gp-input" placeholder="Enter full name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Collection Area *</label>
              <input className="gp-input" placeholder="e.g. Andheri West, Mumbai" value={form.area}
                onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Contact Phone</label>
              <input className="gp-input" placeholder="+91 98765 43210" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-white/50 mb-4">Step 2: Waste Specialization</p>
            <div>
              <label className="text-xs text-white/50 mb-3 block">Select waste types this picker collects:</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(WASTE_COLORS).map(([type, color]) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleSpec(type)}
                    className="p-3 rounded-xl text-left border transition-all"
                    style={{
                      background: form.specialization.includes(type) ? `${color}18` : 'rgba(84,106,47,0.06)',
                      borderColor: form.specialization.includes(type) ? `${color}50` : 'rgba(84,106,47,0.2)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-sm font-medium text-white/80">{type}</span>
                      {form.specialization.includes(type) && <CheckCircle className="w-3.5 h-3.5 ml-auto" style={{ color }} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Daily Collection Average (KG)</label>
              <input type="number" className="gp-input" placeholder="e.g. 30" value={form.avg}
                onChange={e => setForm(f => ({ ...f, avg: e.target.value }))} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-white/50 mb-4">Step 3: Face Capture & ID Generation</p>
            <div className="rounded-xl border-2 border-dashed border-gp-700/50 flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-16 h-16 rounded-full bg-gp-800 flex items-center justify-center">
                <Camera className="w-8 h-8 text-neon-lime/50" />
              </div>
              <div className="text-center">
                <p className="text-sm text-white/50">Click to capture picker's photo</p>
                <p className="text-xs text-white/30 mt-1">Used for identity verification only</p>
              </div>
              <button className="btn-primary text-sm">
                <Camera className="w-4 h-4" /> Capture Photo
              </button>
            </div>
            {/* Preview card */}
            <div className="glass rounded-xl p-4">
              <div className="text-xs font-mono text-neon-lime mb-3">GREENPACK DIGITAL ID — PREVIEW</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gp-gradient flex items-center justify-center">
                  <User className="w-6 h-6 text-neon-lime" />
                </div>
                <div>
                  <div className="font-semibold text-white">{form.name || 'Picker Name'}</div>
                  <div className="text-xs text-white/40">{form.area || 'Collection Area'}</div>
                  <div className="text-xs font-mono text-neon-lime mt-1">GP-{Math.floor(Math.random() * 9000 + 1000)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="flex-1 py-2.5 rounded-xl border border-gp-700/50 text-sm text-white/60 hover:text-white/80">
              ← Back
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(s => s + 1) : onClose()}
            className="flex-1 btn-primary justify-center py-2.5 text-sm"
          >
            {step < 3 ? 'Continue →' : '✓ Register Picker'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PickersPage() {
  const [search, setSearch]     = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<typeof PICKERS[0] | null>(null)

  const filtered = PICKERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.area.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatePresence>{showModal && <RegisterModal onClose={() => setShowModal(false)} />}</AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Manage Pickers</h1>
          <p className="text-white/40 text-sm mt-1">{PICKERS.length} registered waste pickers</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Register New Picker
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Pickers',  value: PICKERS.length,                           color: '#39FF14' },
          { label: 'Gold Badge',     value: PICKERS.filter(p => p.badge === 'GOLD').length,   color: '#FFB800' },
          { label: 'Active Today',   value: 18,                                        color: '#00FFD1' },
          { label: 'Avg Trust Score',value: Math.round(PICKERS.reduce((a, p) => a + p.trust, 0) / PICKERS.length), color: '#B5FF5A' },
        ].map(({ label, value, color }) => (
          <div key={label} className="gp-card p-4 text-center stat-card">
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            className="gp-input pl-10"
            placeholder="Search by name or area..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm text-white/60 hover:text-white/80">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Pickers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((picker, i) => (
          <motion.div
            key={picker.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.07 }}
            className="gp-card p-5 hover:cursor-pointer group"
            onClick={() => setSelected(selected?.id === picker.id ? null : picker)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gp-gradient flex items-center justify-center font-bold text-neon-lime text-sm">
                  {picker.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{picker.name}</div>
                  <div className="text-xs font-mono text-white/30">{picker.id}</div>
                </div>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ color: BADGE_COLORS[picker.badge], background: `${BADGE_COLORS[picker.badge]}15`, border: `1px solid ${BADGE_COLORS[picker.badge]}30` }}
              >
                {picker.badge}
              </span>
            </div>

            {/* Area */}
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
              <MapPin className="w-3.5 h-3.5" /> {picker.area}
            </div>

            {/* Specialization tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {picker.specialization.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${WASTE_COLORS[s]}15`, color: WASTE_COLORS[s], border: `1px solid ${WASTE_COLORS[s]}30` }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="glass rounded-lg py-2">
                <div className="text-sm font-bold gradient-text">{picker.avg}</div>
                <div className="text-xs text-white/30">KG/day</div>
              </div>
              <div className="glass rounded-lg py-2">
                <div className="text-sm font-bold text-white">{(picker.totalKg / 1000).toFixed(1)}T</div>
                <div className="text-xs text-white/30">Total</div>
              </div>
              <div
                className="rounded-lg py-2"
                style={{ background: picker.trust > 90 ? 'rgba(57,255,20,0.1)' : 'rgba(255,184,0,0.1)' }}
              >
                <div className="text-sm font-bold" style={{ color: picker.trust > 90 ? '#39FF14' : '#FFB800' }}>
                  {picker.trust}
                </div>
                <div className="text-xs text-white/30">Trust</div>
              </div>
            </div>

            {/* Trust progress */}
            <div className="mt-3">
              <div className="gp-progress">
                <div className="gp-progress-bar" style={{ width: `${picker.trust}%` }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
