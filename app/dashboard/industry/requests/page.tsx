'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Clock, CheckCircle, XCircle, Package, MapPin, X } from 'lucide-react'

const REQUESTS = [
  { id: 'REQ-001', material: 'Plastic (PET)',  qty: 500,  quality: 'A', location: 'Bengaluru',  status: 'approved',  date: '2024-06-03', matched: 'Rajesh Kumar',  price: '₹18/KG' },
  { id: 'REQ-002', material: 'Scrap Metal',    qty: 200,  quality: 'A', location: 'Bengaluru',  status: 'pending',   date: '2024-06-02', matched: null,            price: '₹42/KG' },
  { id: 'REQ-003', material: 'E-Waste',        qty: 100,  quality: 'A', location: 'Chennai',    status: 'pending',   date: '2024-06-02', matched: 'Patel Kabadi',  price: '₹65/KG' },
  { id: 'REQ-004', material: 'HDPE Plastic',   qty: 300,  quality: 'B', location: 'Bengaluru',  status: 'rejected',  date: '2024-06-01', matched: null,            price: '₹22/KG' },
  { id: 'REQ-005', material: 'Cardboard',      qty: 800,  quality: 'B', location: 'Mumbai',     status: 'completed', date: '2024-05-30', matched: 'Sharma Traders', price: '₹9/KG' },
]

const STATUS_MAP: Record<string, { color: string; icon: typeof CheckCircle; label: string }> = {
  approved:  { color: '#39FF14', icon: CheckCircle, label: 'Approved'  },
  pending:   { color: '#FFB800', icon: Clock,        label: 'Pending'   },
  rejected:  { color: '#FF3860', icon: XCircle,      label: 'Rejected'  },
  completed: { color: '#00FFD1', icon: CheckCircle,  label: 'Completed' },
}

const MATERIALS = ['Plastic (PET)', 'HDPE Plastic', 'Scrap Metal', 'E-Waste', 'Cardboard', 'Aluminum', 'Organic']

function NewRequestModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ material: '', qty: '', quality: 'A', location: '', maxPrice: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  if (submitted) return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="gp-card p-8 text-center max-w-sm w-full">
        <CheckCircle className="w-14 h-14 text-neon-lime mx-auto mb-4" />
        <h2 className="font-display font-bold text-xl text-white mb-2">Request Submitted!</h2>
        <p className="text-sm text-white/50 mb-6">We're matching you with verified kabadiwalas. You'll be notified within 24h.</p>
        <button onClick={onClose} className="btn-primary w-full justify-center">Done</button>
      </div>
    </motion.div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
        className="gp-card p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-white">New Purchase Request</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Material Type *</label>
            <select className="gp-input" value={form.material} onChange={set('material')} required>
              <option value="">Choose material...</option>
              {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Quantity (KG) *</label>
              <input type="number" className="gp-input" placeholder="e.g. 500" value={form.qty} onChange={set('qty')} />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Min Quality *</label>
              <select className="gp-input" value={form.quality} onChange={set('quality')}>
                <option value="A">Grade A — Premium</option>
                <option value="B">Grade B — Standard</option>
                <option value="C">Grade C — Basic</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Delivery Location *</label>
              <input className="gp-input" placeholder="City, State" value={form.location} onChange={set('location')} />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Max Price (₹/KG)</label>
              <input type="number" className="gp-input" placeholder="e.g. 25" value={form.maxPrice} onChange={set('maxPrice')} />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1.5 block">Additional Notes</label>
            <textarea className="gp-input resize-none" rows={2} placeholder="Special requirements..."
              value={form.notes} onChange={set('notes')} />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gp-700/50 text-sm text-white/50 hover:text-white/80">
            Cancel
          </button>
          <button onClick={() => setSubmitted(true)} className="flex-1 btn-primary justify-center py-2.5">
            Submit Request →
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MyRequestsPage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      <AnimatePresence>{showModal && <NewRequestModal onClose={() => setShowModal(false)} />}</AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">My Requests</h1>
          <p className="text-white/40 text-sm mt-1">Track your material purchase requests</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: REQUESTS.length,                               color: '#00FFD1' },
          { label: 'Approved',       value: REQUESTS.filter(r=>r.status==='approved').length,  color: '#39FF14' },
          { label: 'Pending',        value: REQUESTS.filter(r=>r.status==='pending').length,   color: '#FFB800' },
          { label: 'Completed',      value: REQUESTS.filter(r=>r.status==='completed').length, color: '#B5FF5A' },
        ].map(({ label, value, color }) => (
          <div key={label} className="gp-card stat-card p-4 text-center">
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-4">
        {REQUESTS.map((req, i) => {
          const st = STATUS_MAP[req.status]
          return (
            <motion.div key={req.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="gp-card p-5"
              style={{ borderLeft: `3px solid ${st.color}50` }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gp-800 flex items-center justify-center">
                    <Package className="w-5 h-5 text-neon-lime" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{req.material}</div>
                    <div className="text-xs font-mono text-white/30 mt-0.5">{req.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <st.icon className="w-4 h-4" style={{ color: st.color }} />
                  <span className="text-sm font-semibold" style={{ color: st.color }}>{st.label}</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Quantity',  value: `${req.qty} KG`   },
                  { label: 'Quality',   value: `Grade ${req.quality}` },
                  { label: 'Location',  value: req.location       },
                  { label: 'Price',     value: req.price          },
                ].map(({ label, value }) => (
                  <div key={label} className="glass rounded-lg p-2.5">
                    <div className="text-xs text-white/30">{label}</div>
                    <div className="text-sm font-semibold text-white/80 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
              {req.matched && (
                <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-neon-lime/5 border border-neon-lime/10">
                  <CheckCircle className="w-4 h-4 text-neon-lime flex-shrink-0" />
                  <span className="text-xs text-white/60">Matched with: <span className="text-neon-lime font-semibold">{req.matched}</span></span>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" /> {req.date}</span>
                {req.status === 'approved' && (
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10 transition-colors">
                    Confirm Order →
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
