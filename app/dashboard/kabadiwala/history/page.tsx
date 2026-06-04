'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, Package, Filter, Search, ExternalLink } from 'lucide-react'

const TRANSACTIONS = [
  { id: 'TXN-001', type: 'Sale',    material: 'Plastic (PET)',  qty: 240, price: 18, total: 4320, buyer: 'EcoRecycle Ltd',   date: '2024-06-03', status: 'completed', hash: '0x3f2a8b1c' },
  { id: 'TXN-002', type: 'Sale',    material: 'Scrap Metal',    qty: 95,  price: 42, total: 3990, buyer: 'GreenMetal Co',    date: '2024-06-02', status: 'completed', hash: '0x7d1e4f9a' },
  { id: 'TXN-003', type: 'Request', material: 'Cardboard',      qty: 180, price: 9,  total: 1620, buyer: 'PaperTech India',  date: '2024-06-02', status: 'pending',   hash: null },
  { id: 'TXN-004', type: 'Sale',    material: 'E-Waste',        qty: 32,  price: 65, total: 2080, buyer: 'EcoRecycle Ltd',   date: '2024-06-01', status: 'completed', hash: '0x2a8cd4e1' },
  { id: 'TXN-005', type: 'Sale',    material: 'HDPE Plastic',   qty: 120, price: 22, total: 2640, buyer: 'RePlastic Corp',   date: '2024-05-30', status: 'completed', hash: '0x9f3d7a2b' },
  { id: 'TXN-006', type: 'Request', material: 'Aluminum',       qty: 18,  price: 78, total: 1404, buyer: 'Metal Fusion Ltd', date: '2024-05-29', status: 'rejected',  hash: null },
]

const STATUS_MAP: Record<string, { color: string; icon: typeof CheckCircle }> = {
  completed: { color: '#39FF14', icon: CheckCircle },
  pending:   { color: '#FFB800', icon: Clock },
  rejected:  { color: '#FF3860', icon: XCircle },
}

export default function TransactionHistoryPage() {
  const [search, setSearch]       = useState('')
  const [statusFilter, setFilter] = useState('all')

  const filtered = TRANSACTIONS.filter(t => {
    const q = search.toLowerCase()
    const match = t.material.toLowerCase().includes(q) || t.buyer.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
    const st    = statusFilter === 'all' || t.status === statusFilter
    return match && st
  })

  const totalRevenue = TRANSACTIONS.filter(t => t.status === 'completed').reduce((a, t) => a + t.total, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Transaction History</h1>
        <p className="text-white/40 text-sm mt-1">All waste sale transactions & blockchain records</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-lime">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-white/40 mt-1">Total Revenue</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-white">
            {TRANSACTIONS.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-xs text-white/40 mt-1">Completed Sales</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-amber">
            {TRANSACTIONS.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-xs text-white/40 mt-1">Pending Requests</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input className="gp-input pl-10" placeholder="Search material, buyer, or ID..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {['all','completed','pending','rejected'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all capitalize"
            style={{
              background: statusFilter === s ? 'rgba(57,255,20,0.12)' : 'rgba(84,106,47,0.06)',
              borderColor: statusFilter === s ? 'rgba(57,255,20,0.4)' : 'rgba(84,106,47,0.2)',
              color: statusFilter === s ? '#39FF14' : 'rgba(255,255,255,0.5)',
            }}>
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="gp-card overflow-hidden">
        <table className="gp-table">
          <thead>
            <tr>
              <th>ID</th><th>Material</th><th>Qty (KG)</th><th>Price/KG</th>
              <th>Total</th><th>Buyer</th><th>Date</th><th>Status</th><th>Blockchain</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((txn, i) => {
              const st = STATUS_MAP[txn.status]
              return (
                <motion.tr key={txn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}>
                  <td><span className="font-mono text-xs text-white/50">{txn.id}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Package className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/80">{txn.material}</span>
                    </div>
                  </td>
                  <td><span className="text-white/70 font-semibold">{txn.qty}</span></td>
                  <td><span className="text-neon-amber font-semibold">₹{txn.price}</span></td>
                  <td><span className="text-neon-lime font-bold">₹{txn.total.toLocaleString()}</span></td>
                  <td><span className="text-white/60 text-sm">{txn.buyer}</span></td>
                  <td><span className="text-white/40 text-xs">{txn.date}</span></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <st.icon className="w-3.5 h-3.5" style={{ color: st.color }} />
                      <span className="text-xs capitalize" style={{ color: st.color }}>{txn.status}</span>
                    </div>
                  </td>
                  <td>
                    {txn.hash
                      ? <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono text-white/30">{txn.hash}...</span>
                          <ExternalLink className="w-3 h-3 text-white/30 hover:text-neon-lime cursor-pointer" />
                        </div>
                      : <span className="text-xs text-white/20">—</span>
                    }
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
