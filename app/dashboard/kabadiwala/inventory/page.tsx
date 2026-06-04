'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Search, Filter, TrendingUp, AlertCircle, Edit3, Trash2 } from 'lucide-react'

const INVENTORY = [
  { id: 'INV-001', type: 'Plastic (PET)',  qty: 240,  quality: 'A', zone: 'Andheri',  picked_by: 'Ramesh Yadav',   date: '2024-06-03', price: 18, color: '#39FF14' },
  { id: 'INV-002', type: 'Paper / Cardboard', qty: 180, quality: 'B', zone: 'Kurla',  picked_by: 'Sunita Devi',    date: '2024-06-03', price: 9,  color: '#FFB800' },
  { id: 'INV-003', type: 'Scrap Metal',    qty: 95,   quality: 'A', zone: 'Dharavi',  picked_by: 'Manoj Gupta',    date: '2024-06-02', price: 42, color: '#00FFD1' },
  { id: 'INV-004', type: 'E-Waste',        qty: 32,   quality: 'A', zone: 'Bandra',   picked_by: 'Priya Sharma',   date: '2024-06-02', price: 65, color: '#B5FF5A' },
  { id: 'INV-005', type: 'HDPE Plastic',   qty: 120,  quality: 'B', zone: 'Chembur',  picked_by: 'Deepak Kamble',  date: '2024-06-01', price: 22, color: '#39FF14' },
  { id: 'INV-006', type: 'Aluminum',       qty: 18,   quality: 'A', zone: 'Malad',    picked_by: 'Lakshmi Bai',    date: '2024-06-01', price: 78, color: '#00FFD1' },
]

export default function InventoryPage() {
  const [search, setSearch]   = useState('')
  const [editId, setEditId]   = useState<string | null>(null)

  const filtered = INVENTORY.filter(i =>
    i.type.toLowerCase().includes(search.toLowerCase()) ||
    i.zone.toLowerCase().includes(search.toLowerCase())
  )

  const totalValue = INVENTORY.reduce((a, i) => a + i.qty * i.price, 0)
  const totalKg    = INVENTORY.reduce((a, i) => a + i.qty, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Inventory</h1>
          <p className="text-white/40 text-sm mt-1">Current waste stock across all collection zones</p>
        </div>
        <button className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-lime">{totalKg} KG</div>
          <div className="text-xs text-white/40 mt-1">Total Stock</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-amber">₹{totalValue.toLocaleString()}</div>
          <div className="text-xs text-white/40 mt-1">Estimated Value</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-white">{INVENTORY.length}</div>
          <div className="text-xs text-white/40 mt-1">Material Categories</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input className="gp-input pl-10" placeholder="Search by material or zone..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Inventory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.07 }}
            className="gp-card p-5" style={{ borderTop: `2px solid ${item.color}40` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{item.type}</h3>
                <span className="text-xs font-mono text-white/30">{item.id}</span>
              </div>
              <div className="flex gap-1.5">
                <button className="w-7 h-7 rounded-lg bg-gp-800 flex items-center justify-center hover:bg-gp-700">
                  <Edit3 className="w-3.5 h-3.5 text-white/50" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="glass rounded-lg p-2.5 text-center">
                <div className="font-bold text-xl" style={{ color: item.color }}>{item.qty}</div>
                <div className="text-xs text-white/30">KG</div>
              </div>
              <div className="glass rounded-lg p-2.5 text-center">
                <div className="font-bold text-lg text-neon-amber">₹{item.price}</div>
                <div className="text-xs text-white/30">/KG</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-white/40">Quality</span>
                <span className={`font-semibold ${item.quality === 'A' ? 'text-neon-green' : 'text-neon-amber'}`}>
                  Grade {item.quality}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Zone</span>
                <span className="text-white/70">{item.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Picker</span>
                <span className="text-white/70">{item.picked_by}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Logged</span>
                <span className="text-white/50">{item.date}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gp-700/30 flex items-center justify-between">
              <span className="text-xs text-white/40">Est. value:</span>
              <span className="text-sm font-bold text-neon-lime">₹{(item.qty * item.price).toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
