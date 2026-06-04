'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Star, Shield, Package, ArrowRight, SlidersHorizontal } from 'lucide-react'

const MATERIALS = [
  {
    id: 'MAT-001', type: 'Plastic (PET)',  qty: '2.4T', quality: 'A', zone: 'Mumbai West',
    kabadiwala: 'Rajesh Kumar', trust: 94, rating: 4.8, price: '₹18/KG',
    available: true, tags: ['Clean', 'Segregated', 'Ready'],
    color: '#39FF14',
  },
  {
    id: 'MAT-002', type: 'Scrap Metal',    qty: '800KG', quality: 'A', zone: 'Delhi NCR',
    kabadiwala: 'Sharma Traders', trust: 91, rating: 4.7, price: '₹42/KG',
    available: true, tags: ['Grade A', 'Verified'],
    color: '#00FFD1',
  },
  {
    id: 'MAT-003', type: 'Cardboard',      qty: '1.8T', quality: 'B', zone: 'Bengaluru South',
    kabadiwala: 'Green Collectors', trust: 85, rating: 4.3, price: '₹9/KG',
    available: true, tags: ['Dry', 'Mixed'],
    color: '#FFB800',
  },
  {
    id: 'MAT-004', type: 'E-Waste',        qty: '320KG', quality: 'A', zone: 'Hyderabad Central',
    kabadiwala: 'Patel Kabadiwala', trust: 88, rating: 4.5, price: '₹65/KG',
    available: true, tags: ['Certified', 'WEEE'],
    color: '#B5FF5A',
  },
  {
    id: 'MAT-005', type: 'HDPE Plastic',   qty: '900KG', quality: 'B', zone: 'Chennai North',
    kabadiwala: 'Tamil Waste Co', trust: 82, rating: 4.1, price: '₹22/KG',
    available: true, tags: ['Industrial'],
    color: '#39FF14',
  },
  {
    id: 'MAT-006', type: 'Aluminum Cans',  qty: '450KG', quality: 'A', zone: 'Pune East',
    kabadiwala: 'Maratha Recyclers', trust: 89, rating: 4.6, price: '₹78/KG',
    available: false, tags: ['Premium', 'Clean'],
    color: '#00FFD1',
  },
]

const WASTE_TYPES = ['All', 'Plastic', 'Metal', 'Paper', 'E-Waste', 'Organic', 'Aluminum']
const QUALITY_OPTIONS = ['All', 'Grade A', 'Grade B', 'Grade C']

export default function SearchMaterialsPage() {
  const [query, setQuery]           = useState('')
  const [wasteFilter, setWasteFilter] = useState('All')
  const [qualityFilter, setQualityFilter] = useState('All')
  const [showRequest, setShowRequest] = useState<string | null>(null)

  const filtered = MATERIALS.filter(m => {
    const matchesQuery = m.type.toLowerCase().includes(query.toLowerCase()) || m.zone.toLowerCase().includes(query.toLowerCase())
    const matchesWaste = wasteFilter === 'All' || m.type.toLowerCase().includes(wasteFilter.toLowerCase())
    const matchesQuality = qualityFilter === 'All' || `Grade ${m.quality}` === qualityFilter
    return matchesQuery && matchesWaste && matchesQuality
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Search Recyclable Materials</h1>
        <p className="text-white/40 text-sm mt-1">Discover verified material sources from trusted kabadiwalas</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
        <input
          className="gp-input pl-12 py-3.5 text-base"
          placeholder="Search by material type, zone, or kabadiwala..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <SlidersHorizontal className="w-4 h-4" /> Filters:
        </div>
        {/* Waste Type */}
        <div className="flex flex-wrap gap-2">
          {WASTE_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setWasteFilter(t)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: wasteFilter === t ? 'rgba(0,255,209,0.15)' : 'rgba(84,106,47,0.06)',
                borderColor: wasteFilter === t ? 'rgba(0,255,209,0.4)' : 'rgba(84,106,47,0.2)',
                color: wasteFilter === t ? '#00FFD1' : 'rgba(255,255,255,0.5)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="h-4 w-px bg-gp-700" />
        {/* Quality */}
        {QUALITY_OPTIONS.map(q => (
          <button
            key={q}
            onClick={() => setQualityFilter(q)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: qualityFilter === q ? 'rgba(57,255,20,0.15)' : 'rgba(84,106,47,0.06)',
              borderColor: qualityFilter === q ? 'rgba(57,255,20,0.4)' : 'rgba(84,106,47,0.2)',
              color: qualityFilter === q ? '#39FF14' : 'rgba(255,255,255,0.5)',
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/40">{filtered.length} materials found</p>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <div className="glow-dot" /> Real-time inventory
        </div>
      </div>

      {/* Material Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((mat, i) => (
          <motion.div
            key={mat.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className={`gp-card p-5 ${!mat.available ? 'opacity-50' : ''}`}
            style={{ borderTop: `2px solid ${mat.color}40` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-white">{mat.type}</h3>
                <div className="text-xs font-mono text-white/30 mt-0.5">{mat.id}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg" style={{ color: mat.color }}>{mat.qty}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  mat.quality === 'A' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-amber/10 text-neon-amber'
                }`}>
                  Grade {mat.quality}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
              <MapPin className="w-3.5 h-3.5" /> {mat.zone}
            </div>

            {/* Supplier */}
            <div className="flex items-center gap-2 mb-3 p-2.5 rounded-lg bg-gp-900/60">
              <div className="w-7 h-7 rounded-lg bg-gp-gradient flex items-center justify-center text-xs font-bold text-neon-lime flex-shrink-0">
                {mat.kabadiwala.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white/80 truncate">{mat.kabadiwala}</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-neon-amber fill-current" />
                    <span className="text-xs text-neon-amber">{mat.rating}</span>
                  </div>
                  <span className="text-xs text-white/30">Trust: {mat.trust}</span>
                </div>
              </div>
              <div className="badge-trusted text-xs">✓</div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {mat.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded glass text-white/50">{t}</span>
              ))}
            </div>

            {/* Price + Action */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold gradient-text">{mat.price}</span>
              <button
                onClick={() => setShowRequest(mat.id)}
                disabled={!mat.available}
                className="text-xs px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5"
                style={{
                  background: mat.available ? `${mat.color}18` : 'rgba(84,106,47,0.1)',
                  color: mat.available ? mat.color : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${mat.color}${mat.available ? '40' : '10'}`,
                }}
              >
                {mat.available ? 'Request →' : 'Sold Out'}
              </button>
            </div>

            {showRequest === mat.id && (
              <div className="mt-4 pt-4 border-t border-gp-700/30">
                <p className="text-xs text-neon-lime mb-2">✓ Purchase request submitted! Kabadiwala will be notified.</p>
                <button onClick={() => setShowRequest(null)} className="text-xs text-white/30 hover:text-white/60">Dismiss</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
