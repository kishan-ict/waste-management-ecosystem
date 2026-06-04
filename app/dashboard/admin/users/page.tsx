'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, Search, Shield, Ban, CheckCircle, X, Eye,
  Filter, AlertTriangle, Star, MapPin, ChevronDown
} from 'lucide-react'

const USERS = [
  { id: 'KB-1023', name: 'Rajesh Kumar',     role: 'kabadiwala', city: 'Mumbai',    trust: 94, status: 'active',    joined: '2023-01-15', waste: '42T' },
  { id: 'KB-0891', name: 'Sharma Traders',   role: 'kabadiwala', city: 'Delhi',     trust: 91, status: 'active',    joined: '2023-03-10', waste: '38T' },
  { id: 'KB-2234', name: 'Suspicious User',  role: 'kabadiwala', city: 'Pune',      trust: 32, status: 'flagged',   joined: '2024-05-01', waste: '2T'  },
  { id: 'KB-0445', name: 'Patel Kabadiwala', role: 'kabadiwala', city: 'Ahmedabad', trust: 88, status: 'active',    joined: '2023-06-20', waste: '28T' },
  { id: 'IND-234', name: 'EcoRecycle Ltd',   role: 'industry',   city: 'Bengaluru', trust: 95, status: 'active',    joined: '2023-02-01', waste: '—'   },
  { id: 'IND-089', name: 'GreenMetal Co',    role: 'industry',   city: 'Chennai',   trust: 88, status: 'active',    joined: '2023-07-15', waste: '—'   },
  { id: 'IND-891', name: 'Fake Industry Co', role: 'industry',   city: 'Unknown',   trust: 12, status: 'banned',    joined: '2024-04-10', waste: '—'   },
  { id: 'KB-1104', name: 'Ravi Waste Coll',  role: 'kabadiwala', city: 'Hyderabad', trust: 71, status: 'suspended', joined: '2024-01-05', waste: '9T'  },
]

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  active:    { bg: 'rgba(57,255,20,0.1)',   text: '#39FF14', border: 'rgba(57,255,20,0.3)'   },
  flagged:   { bg: 'rgba(255,184,0,0.1)',   text: '#FFB800', border: 'rgba(255,184,0,0.3)'   },
  banned:    { bg: 'rgba(255,56,96,0.1)',   text: '#FF3860', border: 'rgba(255,56,96,0.3)'   },
  suspended: { bg: 'rgba(167,139,250,0.1)', text: '#A78BFA', border: 'rgba(167,139,250,0.3)' },
}

const ROLE_COLORS: Record<string, string> = { kabadiwala: '#FFB800', industry: '#00FFD1', admin: '#B5FF5A' }

export default function AdminUsersPage() {
  const [search, setSearch]     = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)
  const [actionMsg, setActionMsg] = useState<string | null>(null)

  const filtered = USERS.filter(u => {
    const q = search.toLowerCase()
    const matchSearch = u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
    const matchRole   = roleFilter   === 'all' || u.role   === roleFilter
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const doAction = (action: string, userId: string) => {
    setActionMsg(`✓ User ${userId} has been ${action}`)
    setTimeout(() => setActionMsg(null), 3000)
    setSelected(null)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">User Management</h1>
          <p className="text-white/40 text-sm mt-1">{USERS.length} registered users across all roles</p>
        </div>
        <div className="flex gap-2">
          {['all','kabadiwala','industry'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all capitalize"
              style={{
                background: roleFilter === r ? 'rgba(181,255,90,0.15)' : 'rgba(84,106,47,0.08)',
                borderColor: roleFilter === r ? 'rgba(181,255,90,0.4)' : 'rgba(84,106,47,0.2)',
                color: roleFilter === r ? '#B5FF5A' : 'rgba(255,255,255,0.5)',
              }}>
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {actionMsg && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            className="glass rounded-xl p-3 border border-neon-lime/20 text-sm text-neon-lime flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {actionMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',    value: USERS.length,                                  color: '#B5FF5A' },
          { label: 'Active',         value: USERS.filter(u => u.status === 'active').length,  color: '#39FF14' },
          { label: 'Flagged',        value: USERS.filter(u => u.status === 'flagged').length, color: '#FFB800' },
          { label: 'Banned',         value: USERS.filter(u => u.status === 'banned').length,  color: '#FF3860' },
        ].map(({ label, value, color }) => (
          <div key={label} className="gp-card stat-card p-4 text-center">
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input className="gp-input pl-10" placeholder="Search by name, ID, or city..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="gp-input w-40"
          value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="flagged">Flagged</option>
          <option value="suspended">Suspended</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="gp-card overflow-hidden">
        <table className="gp-table">
          <thead>
            <tr>
              <th>User</th><th>Role</th><th>City</th><th>Trust</th>
              <th>Waste</th><th>Joined</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <motion.tr key={u.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${ROLE_COLORS[u.role]}18`, color: ROLE_COLORS[u.role] }}>
                      {u.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{u.name}</div>
                      <div className="text-xs font-mono text-white/30">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-xs capitalize px-2 py-0.5 rounded-full"
                    style={{ background: `${ROLE_COLORS[u.role]}15`, color: ROLE_COLORS[u.role] }}>
                    {u.role}
                  </span>
                </td>
                <td><div className="flex items-center gap-1 text-white/60"><MapPin className="w-3 h-3" />{u.city}</div></td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 gp-progress">
                      <div className="gp-progress-bar" style={{ width: `${u.trust}%`,
                        background: u.trust > 70 ? 'linear-gradient(90deg,#39FF1460,#39FF14)' : 'linear-gradient(90deg,#FF386060,#FF3860)' }} />
                    </div>
                    <span className="text-xs" style={{ color: u.trust > 70 ? '#39FF14' : '#FF3860' }}>{u.trust}</span>
                  </div>
                </td>
                <td className="text-white/60 text-sm">{u.waste}</td>
                <td className="text-white/40 text-xs">{u.joined}</td>
                <td>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold border"
                    style={STATUS_STYLES[u.status]}>
                    {u.status.toUpperCase()}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button className="w-7 h-7 rounded-lg bg-gp-800 flex items-center justify-center hover:bg-gp-700" title="View">
                      <Eye className="w-3.5 h-3.5 text-white/60" />
                    </button>
                    {u.status !== 'banned' && (
                      <button onClick={() => doAction('banned', u.id)}
                        className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20" title="Ban">
                        <Ban className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    )}
                    {u.status === 'banned' && (
                      <button onClick={() => doAction('restored', u.id)}
                        className="w-7 h-7 rounded-lg bg-neon-green/10 flex items-center justify-center hover:bg-neon-green/20" title="Restore">
                        <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-white/30 text-sm">No users found matching your filters.</div>
        )}
      </div>
    </div>
  )
}
