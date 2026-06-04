'use client'

import { motion } from 'framer-motion'
import {
  Users, Package, TrendingUp, AlertTriangle, Shield, Database,
  Activity, ArrowUpRight, Brain, CheckCircle, X, Eye
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LineChart, Line
} from 'recharts'

const ecosystemGrowth = [
  { month: 'Jan', pickers: 8200, kabadiwalas: 420, industry: 180 },
  { month: 'Feb', pickers: 8900, kabadiwalas: 445, industry: 210 },
  { month: 'Mar', pickers: 9800, kabadiwalas: 470, industry: 250 },
  { month: 'Apr', pickers: 10500, kabadiwalas: 502, industry: 290 },
  { month: 'May', pickers: 11400, kabadiwalas: 535, industry: 330 },
  { month: 'Jun', pickers: 12847, kabadiwalas: 578, industry: 389 },
]

const wasteFlowData = [
  { zone: 'Mumbai',    collected: 42000, recycled: 38000, pending: 4000 },
  { zone: 'Delhi',     collected: 38000, recycled: 32000, pending: 6000 },
  { zone: 'Bengaluru', collected: 31000, recycled: 28000, pending: 3000 },
  { zone: 'Chennai',   collected: 25000, recycled: 22000, pending: 3000 },
  { zone: 'Hyderabad', collected: 22000, recycled: 19000, pending: 3000 },
  { zone: 'Pune',      collected: 18000, recycled: 16000, pending: 2000 },
]

const recentAlerts = [
  { id: 'ALT-001', type: 'fraud',   severity: 'high',   msg: 'Duplicate picker registration detected — Kabadiwala ID KB-2234', time: '2h ago' },
  { id: 'ALT-002', type: 'quality', severity: 'medium', msg: 'Unusual quality drop reported by EcoRecycle Industries', time: '4h ago' },
  { id: 'ALT-003', type: 'volume',  severity: 'low',    msg: 'Abnormal volume spike in Dharavi zone — review required', time: '6h ago' },
  { id: 'ALT-004', type: 'fraud',   severity: 'high',   msg: 'Industry account GP-IND-0891 flagged for suspicious requests', time: '1d ago' },
]

const blockchainLogs = [
  { hash: '0x3f2a...8b1c', type: 'Waste Entry',     actor: 'KB-1023', status: 'confirmed', time: '3 min ago' },
  { hash: '0x7d1e...4f9a', type: 'Transaction',     actor: 'IND-0234', status: 'confirmed', time: '8 min ago' },
  { hash: '0x2a8c...d4e1', type: 'Certificate',     actor: 'KB-0891', status: 'confirmed', time: '15 min ago' },
  { hash: '0x9f3d...7a2b', type: 'Trust Update',    actor: 'SYS',     status: 'pending',   time: '22 min ago' },
  { hash: '0x1b5e...c3d8', type: 'Picker Register', actor: 'KB-0445', status: 'confirmed', time: '31 min ago' },
]

const systemMetrics = [
  { label: 'API Response',  value: 98.7, unit: '%', color: '#39FF14' },
  { label: 'DB Health',     value: 100,  unit: '%', color: '#39FF14' },
  { label: 'AI Engine',     value: 96.2, unit: '%', color: '#FFB800' },
  { label: 'Blockchain',    value: 99.9, unit: '%', color: '#00FFD1' },
]

const SEVERITY_COLORS: Record<string, string> = { high: '#FF3860', medium: '#FFB800', low: '#39FF14' }

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Ecosystem Control Center</h1>
          <p className="text-white/40 text-sm mt-1">Real-time platform intelligence & management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-neon-lime" />
            <span className="text-xs font-mono text-neon-lime">ALL SYSTEMS NORMAL</span>
          </div>
        </div>
      </div>

      {/* Critical Alert Banner */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass rounded-xl p-4 flex items-center gap-4 border border-red-500/20"
      >
        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono text-red-400 font-semibold">CRITICAL ALERT · </span>
          <span className="text-sm text-white/70">2 high-severity fraud alerts require immediate review. Suspicious registration pattern detected.</span>
        </div>
        <button className="text-xs text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 whitespace-nowrap">
          Review Now
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users,       label: 'Total Pickers',      value: '12,847', color: '#39FF14', change: '+342 this week' },
          { icon: Shield,      label: 'Kabadiwalas',        value: '578',    color: '#FFB800', change: '+18 this week'  },
          { icon: Package,     label: 'Waste Tracked (T)',  value: '4,218',  color: '#00FFD1', change: '+127T today'    },
          { icon: AlertTriangle,label: 'Fraud Flags',       value: '4',      color: '#FF3860', change: '2 critical'     },
        ].map(({ icon: Icon, label, value, color, change }) => (
          <motion.div key={label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="gp-card stat-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
            </div>
            <div className="font-display font-bold text-2xl text-white">{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
            <div className="text-xs mt-1.5 font-medium" style={{ color }}>{change}</div>
          </motion.div>
        ))}
      </div>

      {/* Ecosystem Growth + Waste Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ecosystem Growth */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Ecosystem Growth</h2>
          <p className="text-xs text-white/40 mb-5">Registered users by role — 2024</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ecosystemGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
              <Line type="monotone" dataKey="pickers"      stroke="#39FF14" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="kabadiwalas"  stroke="#FFB800" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="industry"     stroke="#00FFD1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3">
            {[['Pickers', '#39FF14'], ['Kabadiwalas', '#FFB800'], ['Industry', '#00FFD1']].map(([l, c]) => (
              <div key={l} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-xs text-white/40">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Waste by Zone */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Waste Flow by City</h2>
          <p className="text-xs text-white/40 mb-5">Collected vs Recycled (KG) — June</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={wasteFlowData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="zone" width={70} />
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
              <Bar dataKey="recycled"  fill="#39FF14" radius={[0,4,4,0]} opacity={0.8} />
              <Bar dataKey="pending"   fill="#FF3860" radius={[0,4,4,0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fraud Alerts */}
        <div className="gp-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white">Recent Alerts</h2>
            <span className="badge-warning">4 ACTIVE</span>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-gp-900/50 border border-gp-800/20">
                <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: SEVERITY_COLORS[alert.severity] }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/80 truncate">{alert.msg}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-white/30">{alert.id}</span>
                    <span className="text-xs text-white/30">·</span>
                    <span className="text-xs text-white/30">{alert.time}</span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-semibold ml-1"
                      style={{ background: `${SEVERITY_COLORS[alert.severity]}15`, color: SEVERITY_COLORS[alert.severity] }}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="w-7 h-7 rounded-lg bg-neon-green/10 flex items-center justify-center hover:bg-neon-green/20">
                    <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health + Blockchain */}
        <div className="space-y-4">
          {/* Health */}
          <div className="gp-card p-5">
            <h2 className="font-display font-semibold text-white mb-4">System Health</h2>
            <div className="space-y-3">
              {systemMetrics.map(({ label, value, unit, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-white/50">{label}</span>
                    <span className="text-xs font-mono" style={{ color }}>{value}{unit}</span>
                  </div>
                  <div className="gp-progress">
                    <div className="gp-progress-bar" style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}60, ${color})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Recent */}
          <div className="gp-card p-5">
            <h2 className="font-display font-semibold text-white mb-4">Blockchain Logs</h2>
            <div className="space-y-2">
              {blockchainLogs.slice(0, 4).map((log) => (
                <div key={log.hash} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${log.status === 'confirmed' ? 'bg-neon-green' : 'bg-neon-amber'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-white/40 truncate">{log.hash}</div>
                    <div className="text-xs text-white/60">{log.type} · {log.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-xs text-neon-lime hover:underline mt-3 flex items-center gap-1">
              View all logs <Eye className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
