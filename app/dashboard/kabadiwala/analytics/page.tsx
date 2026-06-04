'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Package, Users } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const weekly = [
  { day: 'Mon', kg: 120, revenue: 2400 }, { day: 'Tue', kg: 145, revenue: 2900 },
  { day: 'Wed', kg: 98,  revenue: 1960 }, { day: 'Thu', kg: 167, revenue: 3340 },
  { day: 'Fri', kg: 203, revenue: 4060 }, { day: 'Sat', kg: 89,  revenue: 1780 },
  { day: 'Sun', kg: 25,  revenue: 500  },
]

const monthly = [
  { month: 'Jan', kg: 3200 }, { month: 'Feb', kg: 2900 }, { month: 'Mar', kg: 3800 },
  { month: 'Apr', kg: 4200 }, { month: 'May', kg: 5100 }, { month: 'Jun', kg: 5780 },
]

const pieData = [
  { name: 'Plastic',  value: 42, color: '#39FF14' },
  { name: 'Paper',    value: 28, color: '#FFB800' },
  { name: 'Metal',    value: 18, color: '#00FFD1' },
  { name: 'E-Waste',  value: 8,  color: '#B5FF5A' },
  { name: 'Organic',  value: 4,  color: '#A78BFA' },
]

export default function KabadiAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Your collection performance & revenue trends</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package,    label: 'This Month (KG)',  value: '5,780',  color: '#39FF14', change: '+13%' },
          { icon: TrendingUp, label: 'Monthly Revenue',  value: '₹1.1L',  color: '#FFB800', change: '+18%' },
          { icon: Users,      label: 'Active Pickers',   value: '23',     color: '#00FFD1', change: '+2'   },
          { icon: BarChart3,  label: 'Avg KG / Picker',  value: '42 KG',  color: '#B5FF5A', change: '+8%'  },
        ].map(({ icon: Icon, label, value, color, change }) => (
          <motion.div key={label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="gp-card stat-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
            </div>
            <div className="font-display font-bold text-2xl text-white">{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
            <div className="text-xs mt-1 text-neon-lime font-semibold">{change} MoM</div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-1">Weekly Collection</h2>
        <p className="text-xs text-white/40 mb-5">KG collected this week</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }}
              formatter={(v: number) => [`${v} KG`, 'Collection']} />
            <Bar dataKey="kg" fill="#39FF14" radius={[4,4,0,0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly trend */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Monthly Trend</h2>
          <p className="text-xs text-white/40 mb-5">Total KG — Jan to Jun 2024</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#39FF14" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="kg" stroke="#39FF14" fill="url(#monthGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Material breakdown */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Material Breakdown</h2>
          <p className="text-xs text-white/40 mb-4">This month's collection by type</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} innerRadius={35} dataKey="value" strokeWidth={0}>
                {pieData.map(e => <Cell key={e.name} fill={e.color} opacity={0.85} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {pieData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-xs text-white/50">{name}</span>
                <span className="text-xs font-semibold ml-auto" style={{ color }}>{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
