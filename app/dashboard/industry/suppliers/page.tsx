'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Shield, Phone, MessageSquare, Package, Filter, Search } from 'lucide-react'

const SUPPLIERS = [
  { id: 'KB-1023', name: 'Rajesh Kumar',      city: 'Mumbai West',    materials: ['Plastic PET', 'Metal'], trust: 94, rating: 4.8, verified: true,  txns: 520, available: '2.4T',  since: '2023-01-15', badge: 'GOLD'   },
  { id: 'KB-0891', name: 'Sharma Traders',    city: 'Delhi NCR',      materials: ['Paper', 'Cardboard'],   trust: 91, rating: 4.7, verified: true,  txns: 410, available: '1.8T',  since: '2023-03-10', badge: 'GOLD'   },
  { id: 'KB-0445', name: 'Patel Kabadiwala',  city: 'Ahmedabad',      materials: ['Metal', 'E-Waste'],      trust: 88, rating: 4.5, verified: true,  txns: 310, available: '900KG', since: '2023-06-20', badge: 'SILVER' },
  { id: 'KB-1104', name: 'Ravi Waste Coll',   city: 'Hyderabad',      materials: ['Plastic', 'Organic'],   trust: 71, rating: 4.1, verified: true,  txns: 180, available: '600KG', since: '2024-01-05', badge: 'SILVER' },
  { id: 'KB-2001', name: 'Green Collectors',  city: 'Bengaluru South', materials: ['Paper', 'Organic'],    trust: 85, rating: 4.3, verified: false, txns: 240, available: '1.2T',  since: '2023-08-12', badge: 'SILVER' },
  { id: 'KB-2212', name: 'Tamil Waste Co',    city: 'Chennai North',   materials: ['Plastic HDPE'],        trust: 82, rating: 4.1, verified: false, txns: 155, available: '900KG', since: '2024-02-20', badge: 'BRONZE' },
]

const BADGE_COLORS: Record<string, string> = { GOLD: '#FFB800', SILVER: '#C0C0C0', BRONZE: '#CD7F32' }

export default function TrustedSuppliersPage() {
  const [search, setSearch]     = useState('')
  const [contacted, setContacted] = useState<string[]>([])

  const filtered = SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase()) ||
    s.materials.some(m => m.toLowerCase().includes(search.toLowerCase()))
  )

  const contact = (id: string) => {
    if (!contacted.includes(id)) setContacted(c => [...c, id])
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Trusted Suppliers</h1>
          <p className="text-white/40 text-sm mt-1">Verified kabadiwalas matched to your material needs</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-lime">{SUPPLIERS.filter(s => s.verified).length}</div>
          <div className="text-xs text-white/40 mt-1">Verified Suppliers</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-amber">
            {(SUPPLIERS.reduce((a, s) => a + s.rating, 0) / SUPPLIERS.length).toFixed(1)}★
          </div>
          <div className="text-xs text-white/40 mt-1">Avg Rating</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-white">{SUPPLIERS.filter(s => s.badge === 'GOLD').length}</div>
          <div className="text-xs text-white/40 mt-1">Gold Badge Suppliers</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input className="gp-input pl-10" placeholder="Search by name, city, or material..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((sup, i) => (
          <motion.div key={sup.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.07 }} className="gp-card p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gp-gradient flex items-center justify-center text-neon-lime font-bold text-sm">
                  {sup.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div className="font-semibold text-white">{sup.name}</div>
                  <div className="text-xs font-mono text-white/30">{sup.id}</div>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ color: BADGE_COLORS[sup.badge], background: `${BADGE_COLORS[sup.badge]}15`, border: `1px solid ${BADGE_COLORS[sup.badge]}30` }}>
                {sup.badge}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
              <MapPin className="w-3.5 h-3.5" /> {sup.city}
            </div>

            {/* Materials */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {sup.materials.map(m => (
                <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-gp-800 text-white/60">{m}</span>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="glass rounded-lg p-2">
                <div className="text-sm font-bold text-neon-amber flex items-center justify-center gap-0.5">
                  <Star className="w-3 h-3 fill-current" />{sup.rating}
                </div>
                <div className="text-xs text-white/30">Rating</div>
              </div>
              <div className="glass rounded-lg p-2">
                <div className="text-sm font-bold text-neon-lime">{sup.trust}</div>
                <div className="text-xs text-white/30">Trust</div>
              </div>
              <div className="glass rounded-lg p-2">
                <div className="text-sm font-bold text-white">{sup.txns}</div>
                <div className="text-xs text-white/30">Txns</div>
              </div>
            </div>

            {/* Available stock */}
            <div className="flex items-center justify-between mb-4 p-2.5 rounded-xl bg-gp-900/60">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-neon-lime/60" />
                <span className="text-xs text-white/50">Available now</span>
              </div>
              <span className="text-sm font-bold text-neon-lime">{sup.available}</span>
            </div>

            {/* Trust bar */}
            <div className="gp-progress mb-4">
              <div className="gp-progress-bar" style={{ width: `${sup.trust}%` }} />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => contact(sup.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: contacted.includes(sup.id) ? 'rgba(57,255,20,0.15)' : 'rgba(0,255,209,0.12)',
                  color: contacted.includes(sup.id) ? '#39FF14' : '#00FFD1',
                  border: `1px solid ${contacted.includes(sup.id) ? 'rgba(57,255,20,0.3)' : 'rgba(0,255,209,0.3)'}`,
                }}>
                <MessageSquare className="w-3.5 h-3.5" />
                {contacted.includes(sup.id) ? 'Request Sent ✓' : 'Contact Supplier'}
              </button>
              {sup.verified && (
                <div className="flex items-center gap-1 px-3 rounded-xl border border-neon-lime/20 text-neon-lime">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
