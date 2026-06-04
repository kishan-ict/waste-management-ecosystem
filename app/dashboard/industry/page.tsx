'use client'

import { motion } from 'framer-motion'
import {
  Package, Star, TrendingUp, ShoppingCart, Brain, ArrowUpRight,
  MapPin, Shield, Zap, Eye, CheckCircle, BarChart3
} from 'lucide-react'
import Link from 'next/link'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

const supplyTrend = [
  { month: 'Jan', plastic: 4200, paper: 2800, metal: 1800 },
  { month: 'Feb', plastic: 3900, paper: 3100, metal: 2000 },
  { month: 'Mar', plastic: 5100, paper: 3400, metal: 2200 },
  { month: 'Apr', plastic: 4800, paper: 2900, metal: 2500 },
  { month: 'May', plastic: 6200, paper: 3800, metal: 2800 },
  { month: 'Jun', plastic: 7100, paper: 4200, metal: 3100 },
  { month: 'Jul', plastic: 7800, paper: 4500, metal: 3400 },
]

const topSuppliers = [
  { name: 'Rajesh Kumar', location: 'Mumbai West', material: 'Plastic, Metal', trust: 94, rating: 4.8, verified: true,  available: '2.4T' },
  { name: 'Sharma Traders', location: 'Delhi NCR',   material: 'Paper, Cardboard', trust: 91, rating: 4.7, verified: true,  available: '1.8T' },
  { name: 'Patel Kabadiwala', location: 'Ahmedabad', material: 'Metal, E-Waste', trust: 88, rating: 4.5, verified: true,  available: '900KG' },
  { name: 'Green Collectors', location: 'Bengaluru', material: 'Plastic, Organic', trust: 85, rating: 4.3, verified: false, available: '1.2T' },
]

const aiInsights = [
  { icon: TrendingUp, color: '#39FF14', title: 'Supply Surge',       text: 'Plastic (PET) availability expected +23% next month in Mumbai zone' },
  { icon: Package,    color: '#FFB800', title: 'Price Alert',         text: 'Metal scrap prices dropping — good time to secure bulk contracts' },
  { icon: Brain,      color: '#00FFD1', title: 'Supplier Match',      text: '3 new verified kabadiwalas match your material requirements' },
  { icon: BarChart3,  color: '#B5FF5A', title: 'Demand Forecast',     text: 'Q3 demand for HDPE plastic rising across manufacturing sector' },
]

const qualityRadar = [
  { subject: 'Consistency', A: 92, fullMark: 100 },
  { subject: 'Quality',     A: 88, fullMark: 100 },
  { subject: 'Delivery',    A: 95, fullMark: 100 },
  { subject: 'Quantity',    A: 78, fullMark: 100 },
  { subject: 'Reliability', A: 91, fullMark: 100 },
]

export default function IndustryDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Supply Intelligence Hub</h1>
          <p className="text-white/40 text-sm mt-1">AI-powered recyclable material discovery</p>
        </div>
        <Link href="/dashboard/industry/search" className="btn-primary text-sm" style={{ borderColor: 'rgba(0,255,209,0.3)', color: '#00FFD1', background: 'rgba(0,255,209,0.1)' }}>
          <Package className="w-4 h-4" /> Search Materials
        </Link>
      </div>

      {/* AI Insights Ticker */}
      <div className="glass rounded-xl p-4 border border-neon-lime/15 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Brain className="w-4 h-4 text-neon-lime" />
            <span className="text-xs font-mono text-neon-lime font-semibold">AI FEED</span>
          </div>
          <div className="h-4 w-px bg-gp-700" />
          <p className="text-sm text-white/60 truncate">
            📈 Plastic supply predicted to peak in Zone B this Friday · 🏭 2 new verified kabadiwalas in your area · 📦 Paper availability rising near commercial districts
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package,     label: 'Available Materials',   value: '48',      suffix: 'listings', color: '#00FFD1', change: '+12%' },
          { icon: Star,        label: 'Trusted Suppliers',     value: '23',      suffix: 'verified', color: '#FFB800', change: '+3'   },
          { icon: ShoppingCart,label: 'Active Requests',       value: '7',       suffix: '',         color: '#39FF14', change: '2 pending' },
          { icon: CheckCircle, label: 'Certified Transactions',value: '142',     suffix: 'this year',color: '#B5FF5A', change: '+18%' },
        ].map(({ icon: Icon, label, value, suffix, color, change }) => (
          <motion.div
            key={label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="gp-card stat-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-neon-green bg-neon-green/10 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" /> {change}
              </div>
            </div>
            <div className="font-display font-bold text-2xl text-white">{value}
              <span className="text-sm text-white/30 ml-1.5">{suffix}</span>
            </div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supply Trend */}
        <div className="gp-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-display font-semibold text-white">Material Supply Forecast</h2>
              <p className="text-xs text-white/40 mt-0.5">AI-predicted availability (KG) — next 7 months</p>
            </div>
            <div className="flex items-center gap-1.5 glass rounded-lg px-2 py-1">
              <Zap className="w-3.5 h-3.5 text-neon-lime" />
              <span className="text-xs text-white/50 font-mono">AI FORECAST</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={supplyTrend}>
              <defs>
                {[['plastic', '#39FF14'], ['paper', '#FFB800'], ['metal', '#00FFD1']].map(([k, c]) => (
                  <linearGradient key={k} id={k} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={c} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="plastic" stroke="#39FF14" fill="url(#plastic)" strokeWidth={2} />
              <Area type="monotone" dataKey="paper"   stroke="#FFB800" fill="url(#paper)"   strokeWidth={2} />
              <Area type="monotone" dataKey="metal"   stroke="#00FFD1" fill="url(#metal)"   strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Supplier Quality Radar */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Avg Supplier Quality</h2>
          <p className="text-xs text-white/40 mb-4">Top 10 suppliers composite</p>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={qualityRadar}>
              <PolarGrid stroke="rgba(84,106,47,0.25)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(232,240,216,0.4)', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="A" stroke="#00FFD1" fill="#00FFD1" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {qualityRadar.map(({ subject, A }) => (
              <div key={subject} className="flex items-center gap-2">
                <span className="text-xs text-white/40 w-20 flex-shrink-0">{subject}</span>
                <div className="flex-1 gp-progress">
                  <div className="gp-progress-bar" style={{ width: `${A}%`, background: 'linear-gradient(90deg, #00FFD130, #00FFD1)' }} />
                </div>
                <span className="text-xs font-mono text-white/60">{A}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Suppliers Table */}
      <div className="gp-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-semibold text-white">Recommended Suppliers</h2>
          <Link href="/dashboard/industry/suppliers" className="text-xs text-neon-lime hover:underline flex items-center gap-1">
            View all <Eye className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="gp-table">
            <thead>
              <tr>
                <th>Kabadiwala</th>
                <th>Location</th>
                <th>Materials</th>
                <th>Available</th>
                <th>Trust</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topSuppliers.map((s) => (
                <tr key={s.name}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gp-gradient flex items-center justify-center text-xs font-bold text-neon-lime flex-shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-white">{s.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/30" /> {s.location}
                    </div>
                  </td>
                  <td className="text-white/50">{s.material}</td>
                  <td><span className="text-neon-lime font-semibold">{s.available}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 gp-progress">
                        <div className="gp-progress-bar" style={{ width: `${s.trust}%` }} />
                      </div>
                      <span className="text-xs text-white/60">{s.trust}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-neon-amber">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-semibold">{s.rating}</span>
                    </div>
                  </td>
                  <td>
                    {s.verified
                      ? <span className="badge-trusted flex items-center gap-1 w-fit"><Shield className="w-3 h-3" /> VERIFIED</span>
                      : <span className="badge-warning w-fit">PENDING</span>}
                  </td>
                  <td>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-neon-lime/30 text-neon-lime hover:bg-neon-lime/10 transition-colors">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiInsights.map(({ icon: Icon, color, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="gp-card p-4"
            style={{ borderLeft: `2px solid ${color}40` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-white/60">{title}</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
