'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, CheckCircle, Clock, ExternalLink, Search, Shield, Copy } from 'lucide-react'

const BLOCKCHAIN_LOGS = [
  { hash: '0x3f2a8b1c9d4e7f2a', type: 'Waste Entry',       actor: 'KB-1023', network: 'Polygon', block: 52841934, status: 'confirmed', time: '3 min ago',  gas: '0.0021' },
  { hash: '0x7d1e4f9a2c8b5e3d', type: 'Transaction',        actor: 'IND-234',  network: 'Polygon', block: 52841898, status: 'confirmed', time: '8 min ago',  gas: '0.0034' },
  { hash: '0x2a8cd4e19f3b7c1e', type: 'Recycling Cert',    actor: 'KB-0891', network: 'Polygon', block: 52841754, status: 'confirmed', time: '15 min ago', gas: '0.0028' },
  { hash: '0x9f3d7a2b1c5e8d4f', type: 'Trust Update',      actor: 'SYS',      network: 'Polygon', block: 52841721, status: 'pending',   time: '22 min ago', gas: '0.0015' },
  { hash: '0x1b5ec3d88a2f7b4e', type: 'Picker Register',   actor: 'KB-0445', network: 'Polygon', block: 52841680, status: 'confirmed', time: '31 min ago', gas: '0.0019' },
  { hash: '0x4e2c9f1a7b3d8e5c', type: 'Waste Entry',       actor: 'KB-1104', network: 'Polygon', block: 52841612, status: 'confirmed', time: '45 min ago', gas: '0.0021' },
  { hash: '0x8a3b6e2d5c9f1a7b', type: 'Transaction',        actor: 'IND-089',  network: 'Polygon', block: 52841580, status: 'failed',    time: '52 min ago', gas: '0.0012' },
  { hash: '0x5d9c4f8e2a7b1c3d', type: 'Recycling Cert',    actor: 'KB-1023', network: 'Polygon', block: 52841510, status: 'confirmed', time: '1h ago',     gas: '0.0028' },
  { hash: '0x2f7a1c5e9b3d8f4a', type: 'Picker Register',   actor: 'KB-0891', network: 'Polygon', block: 52841445, status: 'confirmed', time: '1h ago',     gas: '0.0019' },
  { hash: '0x7b4e9d3c6f2a8e1b', type: 'Trust Update',      actor: 'SYS',      network: 'Polygon', block: 52841399, status: 'confirmed', time: '1.5h ago',   gas: '0.0015' },
]

const STATUS_STYLES: Record<string, { color: string; bg: string; dot: string }> = {
  confirmed: { color: '#39FF14', bg: 'rgba(57,255,20,0.1)',  dot: '#39FF14' },
  pending:   { color: '#FFB800', bg: 'rgba(255,184,0,0.1)',  dot: '#FFB800' },
  failed:    { color: '#FF3860', bg: 'rgba(255,56,96,0.1)',  dot: '#FF3860' },
}

const TYPE_COLORS: Record<string, string> = {
  'Waste Entry':     '#39FF14',
  'Transaction':     '#00FFD1',
  'Recycling Cert':  '#FFB800',
  'Trust Update':    '#B5FF5A',
  'Picker Register': '#A78BFA',
}

export default function BlockchainLogsPage() {
  const [search, setSearch]   = useState('')
  const [copied, setCopied]   = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('all')

  const types = ['all', ...Array.from(new Set(BLOCKCHAIN_LOGS.map(l => l.type)))]

  const filtered = BLOCKCHAIN_LOGS.filter(log => {
    const q = search.toLowerCase()
    const matchSearch = log.hash.includes(q) || log.actor.toLowerCase().includes(q) || log.type.toLowerCase().includes(q)
    const matchType   = typeFilter === 'all' || log.type === typeFilter
    return matchSearch && matchType
  })

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {})
    setCopied(hash)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-lime/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-neon-lime" />
            </div>
            Blockchain Verification Logs
          </h1>
          <p className="text-white/40 text-sm mt-1">Immutable transaction records on Polygon network</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <div className="glow-dot" />
          <span className="text-xs font-mono text-neon-lime">POLYGON MAINNET · LIVE</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Transactions',  value: '48,291',  color: '#39FF14' },
          { label: 'Confirmed',           value: '48,276',  color: '#39FF14' },
          { label: 'Pending',             value: '12',      color: '#FFB800' },
          { label: 'Failed',              value: '3',       color: '#FF3860' },
        ].map(({ label, value, color }) => (
          <div key={label} className="gp-card stat-card p-4 text-center">
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input className="gp-input pl-10" placeholder="Search by hash, actor, or type..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all capitalize"
              style={{
                background: typeFilter === t ? 'rgba(57,255,20,0.12)' : 'rgba(84,106,47,0.06)',
                borderColor: typeFilter === t ? 'rgba(57,255,20,0.4)' : 'rgba(84,106,47,0.2)',
                color: typeFilter === t ? '#39FF14' : 'rgba(255,255,255,0.5)',
              }}>
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="gp-card overflow-hidden">
        <table className="gp-table">
          <thead>
            <tr>
              <th>Tx Hash</th><th>Type</th><th>Actor</th><th>Block</th>
              <th>Status</th><th>Gas (MATIC)</th><th>Time</th><th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const st     = STATUS_STYLES[log.status]
              const typeClr = TYPE_COLORS[log.type] || '#39FF14'
              return (
                <motion.tr key={log.hash} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-white/50">
                        {log.hash.slice(0, 10)}...{log.hash.slice(-6)}
                      </span>
                      <button onClick={() => copyHash(log.hash)}
                        className="text-white/20 hover:text-white/60 transition-colors"
                        title="Copy hash">
                        {copied === log.hash
                          ? <CheckCircle className="w-3.5 h-3.5 text-neon-lime" />
                          : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${typeClr}15`, color: typeClr }}>
                      {log.type}
                    </span>
                  </td>
                  <td><span className="text-xs font-mono text-white/60">{log.actor}</span></td>
                  <td><span className="text-xs font-mono text-white/50">#{log.block.toLocaleString()}</span></td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
                      <span className="text-xs capitalize" style={{ color: st.color }}>{log.status}</span>
                    </div>
                  </td>
                  <td><span className="text-xs font-mono text-white/50">{log.gas}</span></td>
                  <td><span className="text-xs text-white/30">{log.time}</span></td>
                  <td>
                    <button className="text-white/30 hover:text-neon-lime transition-colors" title="View on Polygonscan">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
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
