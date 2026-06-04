'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, X, Eye, Shield, Clock, Filter, Search } from 'lucide-react'

const FRAUD_ALERTS = [
  {
    id: 'FRD-001', type: 'Duplicate Registration',   severity: 'high',   entity: 'KB-2234',
    actor: 'Suspicious User', detail: 'Same face biometric detected for 2 different picker registrations in 24h window.',
    zone: 'Pune West', time: '2h ago', status: 'open', confidence: 94,
  },
  {
    id: 'FRD-002', type: 'Industry Account Abuse',   severity: 'high',   entity: 'IND-891',
    actor: 'Fake Industry Co', detail: 'Account sent 48 purchase requests with no transactions completed. Pattern matches marketplace spam.',
    zone: 'Unknown', time: '4h ago', status: 'open', confidence: 91,
  },
  {
    id: 'FRD-003', type: 'Volume Anomaly',            severity: 'medium', entity: 'KB-0891',
    actor: 'Sharma Traders', detail: 'Waste volume spike of +300% in 24h. Industry partner reported quality did not match logged grade.',
    zone: 'Delhi NCR', time: '6h ago', status: 'investigating', confidence: 78,
  },
  {
    id: 'FRD-004', type: 'Quality Mismatch',          severity: 'medium', entity: 'KB-1104',
    actor: 'Ravi Waste Coll', detail: 'Logged Grade A material. Industry buyer rated Grade C on 3 consecutive transactions.',
    zone: 'Hyderabad', time: '1d ago', status: 'resolved', confidence: 82,
  },
  {
    id: 'FRD-005', type: 'GPS Location Anomaly',      severity: 'low',    entity: 'KB-0445',
    actor: 'Patel Kabadiwala', detail: 'Waste entry logged from location 45km away from registered operation zone.',
    zone: 'Ahmedabad', time: '2d ago', status: 'resolved', confidence: 61,
  },
]

const SEV_MAP: Record<string, { color: string; bg: string }> = {
  high:   { color: '#FF3860', bg: 'rgba(255,56,96,0.1)'   },
  medium: { color: '#FFB800', bg: 'rgba(255,184,0,0.1)'   },
  low:    { color: '#39FF14', bg: 'rgba(57,255,20,0.1)'   },
}

const STATUS_MAP: Record<string, { color: string; label: string }> = {
  open:          { color: '#FF3860', label: 'OPEN'          },
  investigating: { color: '#FFB800', label: 'INVESTIGATING'  },
  resolved:      { color: '#39FF14', label: 'RESOLVED'       },
}

export default function FraudDetectionPage() {
  const [alerts, setAlerts] = useState(FRAUD_ALERTS)
  const [filter, setFilter] = useState('all')
  const [toast, setToast]   = useState<string | null>(null)

  const updateStatus = (id: string, status: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    setToast(`Alert ${id} marked as ${status}`)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = filter === 'all' ? alerts : alerts.filter(a =>
    filter === 'open' ? a.status === 'open' || a.status === 'investigating' : a.status === 'resolved'
  )

  const openCount = alerts.filter(a => a.status === 'open').length
  const highCount = alerts.filter(a => a.severity === 'high').length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Fraud Detection Center</h1>
          <p className="text-white/40 text-sm mt-1">AI-powered anomaly detection & case management</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-red-400">{openCount} OPEN CASES</span>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            className="glass rounded-xl p-3 border border-neon-lime/20 text-sm text-neon-lime flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts',   value: alerts.length,  color: '#B5FF5A' },
          { label: 'High Severity',  value: highCount,       color: '#FF3860' },
          { label: 'Open Cases',     value: openCount,       color: '#FFB800' },
          { label: 'Resolved',       value: alerts.filter(a => a.status === 'resolved').length, color: '#39FF14' },
        ].map(({ label, value, color }) => (
          <div key={label} className="gp-card stat-card p-4 text-center">
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { val: 'all',      label: 'All Alerts' },
          { val: 'open',     label: 'Active' },
          { val: 'resolved', label: 'Resolved' },
        ].map(({ val, label }) => (
          <button key={val} onClick={() => setFilter(val)}
            className="text-xs px-4 py-2 rounded-full border transition-all"
            style={{
              background: filter === val ? 'rgba(181,255,90,0.15)' : 'rgba(84,106,47,0.06)',
              borderColor: filter === val ? 'rgba(181,255,90,0.4)' : 'rgba(84,106,47,0.2)',
              color: filter === val ? '#B5FF5A' : 'rgba(255,255,255,0.5)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filtered.map((alert, i) => {
          const sev    = SEV_MAP[alert.severity]
          const status = STATUS_MAP[alert.status]
          return (
            <motion.div key={alert.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              className="gp-card p-5"
              style={{ borderLeft: `3px solid ${sev.color}` }}>
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: sev.bg }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: sev.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{alert.type}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono text-white/30">{alert.id}</span>
                      <span className="text-xs text-white/30">·</span>
                      <span className="text-xs text-white/30">Entity: {alert.entity}</span>
                      <span className="text-xs text-white/30">·</span>
                      <span className="text-xs text-white/30">{alert.zone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: sev.bg, color: sev.color }}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}30` }}>
                    {status.label}
                  </span>
                </div>
              </div>

              {/* Detail */}
              <p className="text-sm text-white/60 leading-relaxed mb-3">{alert.detail}</p>

              {/* Confidence + Time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30">AI Confidence:</span>
                  <div className="w-24 gp-progress">
                    <div className="gp-progress-bar" style={{ width: `${alert.confidence}%`,
                      background: `linear-gradient(90deg, ${sev.color}60, ${sev.color})` }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: sev.color }}>{alert.confidence}%</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <Clock className="w-3.5 h-3.5" /> {alert.time}
                </div>
              </div>

              {/* Actions */}
              {alert.status !== 'resolved' && (
                <div className="flex gap-2">
                  {alert.status === 'open' && (
                    <button onClick={() => updateStatus(alert.id, 'investigating')}
                      className="text-xs px-4 py-2 rounded-lg border border-neon-amber/30 text-neon-amber hover:bg-neon-amber/10 transition-colors">
                      🔍 Investigate
                    </button>
                  )}
                  <button onClick={() => updateStatus(alert.id, 'resolved')}
                    className="text-xs px-4 py-2 rounded-lg border border-neon-green/30 text-neon-green hover:bg-neon-green/10 transition-colors flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Resolve
                  </button>
                  <button className="text-xs px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Ban User
                  </button>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
