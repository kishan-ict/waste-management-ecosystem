'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Check, AlertTriangle, Plus } from 'lucide-react'

const WASTE_TYPES = [
  { id: 'plastic', label: 'Plastic', color: '#39FF14', icon: '♻️' },
  { id: 'paper',   label: 'Paper',   color: '#FFB800', icon: '📄' },
  { id: 'metal',   label: 'Metal',   color: '#00FFD1', icon: '🔩' },
  { id: 'ewaste',  label: 'E-Waste', color: '#B5FF5A', icon: '💻' },
  { id: 'organic', label: 'Organic', color: '#A78BFA', icon: '🌿' },
  { id: 'mixed',   label: 'Mixed',   color: '#FF6B6B', icon: '🗑️' },
]

const QUALITY_LEVELS = [
  { id: 'A', label: 'Grade A — Premium', desc: 'Clean, segregated, no contamination', color: '#39FF14' },
  { id: 'B', label: 'Grade B — Standard', desc: 'Slightly mixed, minor contamination', color: '#FFB800' },
  { id: 'C', label: 'Grade C — Basic',    desc: 'Mixed or moderate contamination',     color: '#FF6B6B' },
]

const PICKERS_LIST = [
  'Ramesh Yadav (GP-001)', 'Sunita Devi (GP-002)', 'Manoj Gupta (GP-003)',
  'Priya Sharma (GP-004)', 'Deepak Kamble (GP-005)',
]

export default function LogWastePage() {
  const [form, setForm] = useState({
    picker: '', wasteType: '', quality: '', quantity: '', area: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="gp-card p-10 text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green/30 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-neon-green" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">Waste Entry Logged!</h2>
          <p className="text-white/50 text-sm mb-2">
            <span className="text-neon-lime font-semibold">{form.quantity} KG</span> of{' '}
            <span className="text-neon-lime font-semibold">{form.wasteType}</span> recorded
          </p>
          <p className="text-xs text-white/30 font-mono mb-6">
            Entry ID: WE-{Date.now().toString().slice(-6)} · Blockchain pending
          </p>
          <div className="glass rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-white/40">Picker</span><span className="text-white/80">{form.picker}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Type</span><span className="text-white/80">{form.wasteType}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Quality</span><span className="text-white/80">Grade {form.quality}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Area</span><span className="text-white/80">{form.area || 'Mumbai Zone'}</span></div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSubmitted(false)} className="flex-1 btn-primary justify-center">
              <Plus className="w-4 h-4" /> Log Another
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Log Waste Entry</h1>
        <p className="text-white/40 text-sm mt-1">Record waste collection from picker to inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Picker Selection */}
        <div className="gp-card p-6">
          <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neon-lime/20 text-neon-lime text-xs flex items-center justify-center font-bold">1</span>
            Select Picker
          </h2>
          <select className="gp-input" value={form.picker} onChange={set('picker')} required>
            <option value="">Choose a registered picker...</option>
            {PICKERS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Waste Type */}
        <div className="gp-card p-6">
          <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neon-lime/20 text-neon-lime text-xs flex items-center justify-center font-bold">2</span>
            Waste Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {WASTE_TYPES.map(wt => (
              <button
                key={wt.id}
                type="button"
                onClick={() => setForm(f => ({ ...f, wasteType: wt.label }))}
                className="p-4 rounded-xl border text-center transition-all"
                style={{
                  background: form.wasteType === wt.label ? `${wt.color}15` : 'rgba(84,106,47,0.06)',
                  borderColor: form.wasteType === wt.label ? `${wt.color}50` : 'rgba(84,106,47,0.2)',
                }}
              >
                <div className="text-2xl mb-2">{wt.icon}</div>
                <div className="text-sm font-medium" style={{ color: form.wasteType === wt.label ? wt.color : 'rgba(255,255,255,0.6)' }}>
                  {wt.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Quality */}
        <div className="gp-card p-6">
          <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neon-lime/20 text-neon-lime text-xs flex items-center justify-center font-bold">3</span>
            Quantity & Quality
          </h2>
          <div className="mb-4">
            <label className="text-xs text-white/50 mb-1 block">Weight (KG) *</label>
            <div className="relative">
              <input
                type="number"
                className="gp-input pr-12"
                placeholder="Enter weight in KG"
                value={form.quantity}
                onChange={set('quantity')}
                required
                min="1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-sm font-mono">KG</span>
            </div>
          </div>

          <label className="text-xs text-white/50 mb-2 block">Material Quality *</label>
          <div className="space-y-2">
            {QUALITY_LEVELS.map(q => (
              <button
                key={q.id}
                type="button"
                onClick={() => setForm(f => ({ ...f, quality: q.id }))}
                className="w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3"
                style={{
                  background: form.quality === q.id ? `${q.color}12` : 'rgba(84,106,47,0.06)',
                  borderColor: form.quality === q.id ? `${q.color}40` : 'rgba(84,106,47,0.2)',
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: q.color }} />
                <div>
                  <div className="text-sm font-medium text-white/80">{q.label}</div>
                  <div className="text-xs text-white/40">{q.desc}</div>
                </div>
                {form.quality === q.id && <Check className="w-4 h-4 ml-auto" style={{ color: q.color }} />}
              </button>
            ))}
          </div>
        </div>

        {/* Location + Notes */}
        <div className="gp-card p-6">
          <h2 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-neon-lime/20 text-neon-lime text-xs flex items-center justify-center font-bold">4</span>
            Additional Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Collection Area</label>
              <input className="gp-input" placeholder="e.g. Andheri West, Mumbai" value={form.area} onChange={set('area')} />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1 block">Notes (optional)</label>
              <textarea className="gp-input resize-none" rows={3} placeholder="Any additional notes about the waste batch..."
                value={form.notes} onChange={set('notes')} />
            </div>
          </div>
        </div>

        {/* Blockchain notice */}
        <div className="flex items-center gap-3 glass rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-neon-amber flex-shrink-0" />
          <p className="text-xs text-white/50">
            This entry will be automatically anchored on Polygon blockchain for tamper-proof verification.
            A unique transaction hash will be generated.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-3.5 text-base"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-neon-lime/30 border-t-neon-lime rounded-full animate-spin" />
              Logging entry to blockchain...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Package className="w-5 h-5" /> Submit Waste Entry
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
