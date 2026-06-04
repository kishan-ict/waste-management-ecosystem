'use client'

import { motion } from 'framer-motion'
import {
  Package, Users, TrendingUp, Star, ArrowUpRight, ArrowDownRight,
  Recycle, Shield, Plus, Eye, BarChart3, Zap, AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

/* ── Mock Data ── */
const weeklyWaste = [
  { day: 'Mon', plastic: 120, paper: 80, metal: 40, ewaste: 15 },
  { day: 'Tue', plastic: 145, paper: 95, metal: 55, ewaste: 20 },
  { day: 'Wed', plastic: 98,  paper: 110, metal: 38, ewaste: 12 },
  { day: 'Thu', plastic: 178, paper: 130, metal: 62, ewaste: 28 },
  { day: 'Fri', plastic: 210, paper: 145, metal: 75, ewaste: 35 },
  { day: 'Sat', plastic: 165, paper: 90,  metal: 48, ewaste: 18 },
  { day: 'Sun', plastic: 88,  paper: 60,  metal: 25, ewaste: 10 },
]

const monthlyTrend = [
  { month: 'Jan', kg: 3200 }, { month: 'Feb', kg: 2800 }, { month: 'Mar', kg: 4100 },
  { month: 'Apr', kg: 3800 }, { month: 'May', kg: 4500 }, { month: 'Jun', kg: 5200 },
]

const wasteBreakdown = [
  { name: 'Plastic', value: 42, color: '#39FF14' },
  { name: 'Paper',   value: 28, color: '#FFB800' },
  { name: 'Metal',   value: 18, color: '#00FFD1' },
  { name: 'E-Waste', value: 8,  color: '#B5FF5A' },
  { name: 'Organic', value: 4,  color: '#A78BFA' },
]

const topPickers = [
  { name: 'Ramesh Yadav',   area: 'Andheri West',   kg: 284, trust: 94, badge: 'GOLD' },
  { name: 'Sunita Devi',    area: 'Kurla East',      kg: 251, trust: 91, badge: 'GOLD' },
  { name: 'Manoj Gupta',    area: 'Dharavi',         kg: 238, trust: 88, badge: 'SILVER' },
  { name: 'Priya Sharma',   area: 'Bandra',          kg: 215, trust: 85, badge: 'SILVER' },
]

const recentRequests = [
  { id: 'IND-001', company: 'EcoRecycle Ltd', material: 'Plastic (PET)', qty: '500 KG', status: 'pending',  time: '2h ago' },
  { id: 'IND-002', company: 'GreenMetal Co',  material: 'Scrap Metal',   qty: '200 KG', status: 'approved', time: '5h ago' },
  { id: 'IND-003', company: 'PaperWorks IN',  material: 'Cardboard',     qty: '350 KG', status: 'approved', time: '1d ago' },
]

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, change, changeType, color, suffix = '' }: {
  icon: React.ElementType; label: string; value: string | number; change: string
  changeType: 'up' | 'down'; color: string; suffix?: string
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="gp-card stat-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          changeType === 'up'
            ? 'text-neon-green bg-neon-green/10'
            : 'text-red-400 bg-red-400/10'
        }`}>
          {changeType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div className="font-display font-bold text-2xl text-white mb-1">
        {value}<span className="text-base text-white/40 ml-1">{suffix}</span>
      </div>
      <div className="text-xs text-white/40 font-medium">{label}</div>
    </motion.div>
  )
}

/* ── Page ── */
export default function KabadiDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            Good morning, Rajesh! 👋
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Here's your waste intelligence overview for today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <div className="glow-dot" />
            <span className="text-xs font-mono text-neon-lime">LIVE</span>
          </div>
          <Link href="/dashboard/kabadiwala/log-waste" className="btn-primary text-sm">
            <Plus className="w-4 h-4" /> Log Waste
          </Link>
        </div>
      </div>

      {/* AI Alert */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="glass rounded-xl p-4 flex items-center gap-4 border border-neon-lime/20"
      >
        <div className="w-9 h-9 rounded-lg bg-neon-lime/10 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-neon-lime" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-mono text-neon-lime font-semibold">AI INSIGHT · </span>
          <span className="text-sm text-white/70">
            Plastic collection expected to peak on Friday (+18%). Consider pre-booking industry buyer for PET category.
          </span>
        </div>
        <button className="text-xs text-neon-lime border border-neon-lime/30 px-3 py-1.5 rounded-lg hover:bg-neon-lime/10 transition-colors whitespace-nowrap">
          View Details
        </button>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package}    label="Waste Collected Today" value="847"  suffix="KG" change="+12%" changeType="up"   color="#39FF14" />
        <StatCard icon={Users}      label="Active Pickers"        value="23"   suffix=""   change="+2"   changeType="up"   color="#FFB800" />
        <StatCard icon={TrendingUp} label="Monthly Total"         value="5.2"  suffix="T"  change="+8%"  changeType="up"   color="#00FFD1" />
        <StatCard icon={Star}       label="Trust Score"           value="94"   suffix="/100" change="+1" changeType="up"   color="#B5FF5A" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Waste Chart */}
        <div className="gp-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-white">Weekly Collection</h2>
              <p className="text-xs text-white/40 mt-0.5">KG by waste type</p>
            </div>
            <div className="flex gap-3">
              {[
                { color: '#39FF14', label: 'Plastic' },
                { color: '#FFB800', label: 'Paper' },
                { color: '#00FFD1', label: 'Metal' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-xs text-white/40">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyWaste}>
              <defs>
                <linearGradient id="plastic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#39FF14" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#FFB800" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#FFB800" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }}
                labelStyle={{ color: '#B5FF5A' }}
              />
              <Area type="monotone" dataKey="plastic" stroke="#39FF14" fill="url(#plastic)" strokeWidth={2} />
              <Area type="monotone" dataKey="paper"   stroke="#FFB800" fill="url(#paper)"   strokeWidth={2} />
              <Area type="monotone" dataKey="metal"   stroke="#00FFD1" fill="none"           strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Waste Breakdown</h2>
          <p className="text-xs text-white/40 mb-4">By category (this month)</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={wasteBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                {wasteBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} opacity={0.85} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {wasteBreakdown.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs text-white/60">{name}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pickers */}
        <div className="gp-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white">Top Pickers This Week</h2>
            <Link href="/dashboard/kabadiwala/pickers" className="text-xs text-neon-lime hover:underline flex items-center gap-1">
              View all <Eye className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {topPickers.map((picker, i) => (
              <div key={picker.name} className="flex items-center gap-3 p-3 rounded-xl bg-gp-900/50 hover:bg-gp-900 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gp-gradient flex items-center justify-center text-xs font-bold text-neon-lime flex-shrink-0">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{picker.name}</div>
                  <div className="text-xs text-white/40">{picker.area}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold gradient-text">{picker.kg} KG</div>
                  <div className={`text-xs font-mono ${picker.badge === 'GOLD' ? 'text-neon-amber' : 'text-white/50'}`}>
                    {picker.badge}
                  </div>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: picker.trust > 90 ? 'rgba(57,255,20,0.15)' : 'rgba(255,184,0,0.15)',
                    color: picker.trust > 90 ? '#39FF14' : '#FFB800',
                  }}
                >
                  {picker.trust}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Requests */}
        <div className="gp-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white">Industry Requests</h2>
            <span className="badge-trusted">3 NEW</span>
          </div>
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <div key={req.id} className="p-3 rounded-xl bg-gp-900/50 border border-gp-800/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-sm font-semibold text-white">{req.company}</div>
                    <div className="text-xs text-white/40 font-mono">{req.id}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    req.status === 'pending'
                      ? 'bg-neon-amber/10 text-neon-amber border border-neon-amber/30'
                      : 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                  }`}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/50">{req.material}</span>
                    <span className="text-xs font-semibold text-neon-lime">{req.qty}</span>
                  </div>
                  <span className="text-xs text-white/30">{req.time}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/kabadiwala/history"
            className="btn-primary w-full justify-center text-sm mt-4">
            View All Requests
          </Link>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="gp-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-semibold text-white">Monthly Performance</h2>
            <p className="text-xs text-white/40 mt-0.5">Total waste collected (KG) — 2024</p>
          </div>
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-neon-lime" />
            <span className="text-xs text-white/60 font-mono">2024</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            <Bar dataKey="kg" radius={[4, 4, 0, 0]}>
              {monthlyTrend.map((_, i) => (
                <Cell key={i} fill={i === monthlyTrend.length - 1 ? '#39FF14' : '#546A2F'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
