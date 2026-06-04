'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Package, Users, Globe } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts'

const monthlyWaste = [
  { month: 'Jan', plastic: 42000, paper: 28000, metal: 18000, ewaste: 8000 },
  { month: 'Feb', plastic: 38000, paper: 31000, metal: 20000, ewaste: 9000 },
  { month: 'Mar', plastic: 51000, paper: 34000, metal: 22000, ewaste: 11000 },
  { month: 'Apr', plastic: 48000, paper: 29000, metal: 25000, ewaste: 13000 },
  { month: 'May', plastic: 62000, paper: 38000, metal: 28000, ewaste: 15000 },
  { month: 'Jun', plastic: 71000, paper: 42000, metal: 31000, ewaste: 18000 },
]

const cityFlow = [
  { city: 'Mumbai',    collected: 420, recycled: 380, efficiency: 90 },
  { city: 'Delhi',     collected: 380, recycled: 320, efficiency: 84 },
  { city: 'Bengaluru', collected: 310, recycled: 280, efficiency: 90 },
  { city: 'Chennai',   collected: 250, recycled: 220, efficiency: 88 },
  { city: 'Hyderabad', collected: 220, recycled: 190, efficiency: 86 },
  { city: 'Pune',      collected: 180, recycled: 160, efficiency: 89 },
]

const transactionTrend = [
  { week: 'W1', transactions: 1240, value: 3.2 },
  { week: 'W2', transactions: 1580, value: 4.1 },
  { week: 'W3', transactions: 1320, value: 3.7 },
  { week: 'W4', transactions: 1890, value: 5.2 },
  { week: 'W5', transactions: 2100, value: 5.8 },
  { week: 'W6', transactions: 1960, value: 5.4 },
]

const materialShare = [
  { name: 'Plastic',  value: 42, color: '#39FF14' },
  { name: 'Paper',    value: 28, color: '#FFB800' },
  { name: 'Metal',    value: 18, color: '#00FFD1' },
  { name: 'E-Waste',  value: 8,  color: '#B5FF5A' },
  { name: 'Organic',  value: 4,  color: '#A78BFA' },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Ecosystem Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Platform-wide waste flow intelligence</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Package, label: 'Total Waste (KG)',   value: '4.2M',  color: '#39FF14', change: '+18% MoM' },
          { icon: TrendingUp, label: 'Recycling Rate',  value: '88.4%', color: '#FFB800', change: '+2.1%'    },
          { icon: Users,   label: 'Active Kabadiwalas', value: '412',   color: '#00FFD1', change: '+34 MoM'  },
          { icon: Globe,   label: 'Cities Covered',     value: '24',    color: '#B5FF5A', change: '+3 cities' },
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
            <div className="text-xs mt-1.5 font-medium text-neon-lime">{change}</div>
          </motion.div>
        ))}
      </div>

      {/* Monthly Waste Trend */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-1">Monthly Waste Flow</h2>
        <p className="text-xs text-white/40 mb-5">All material types — India-wide (KG)</p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={monthlyWaste}>
            <defs>
              {[['plastic','#39FF14'],['paper','#FFB800'],['metal','#00FFD1'],['ewaste','#B5FF5A']].map(([k,c]) => (
                <linearGradient key={k} id={`adm-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={c} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            <Area type="monotone" dataKey="plastic" stroke="#39FF14" fill="url(#adm-plastic)" strokeWidth={2} />
            <Area type="monotone" dataKey="paper"   stroke="#FFB800" fill="url(#adm-paper)"   strokeWidth={2} />
            <Area type="monotone" dataKey="metal"   stroke="#00FFD1" fill="url(#adm-metal)"   strokeWidth={2} />
            <Area type="monotone" dataKey="ewaste"  stroke="#B5FF5A" fill="url(#adm-ewaste)"  strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* City Flow + Material Share */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* City efficiency */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">City Recycling Efficiency</h2>
          <p className="text-xs text-white/40 mb-5">Collected vs Recycled (tonnes)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cityFlow} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="city" width={75} />
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
              <Bar dataKey="collected" fill="rgba(84,106,47,0.4)" radius={[0,4,4,0]} />
              <Bar dataKey="recycled"  fill="#39FF14"             radius={[0,4,4,0]} opacity={0.9} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Material share */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-1">Material Share</h2>
          <p className="text-xs text-white/40 mb-4">Platform-wide breakdown — June 2024</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={materialShare} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" strokeWidth={0}>
                {materialShare.map(e => <Cell key={e.name} fill={e.color} opacity={0.85} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {materialShare.map(({ name, value, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-xs text-white/50">{name}</span>
                <span className="text-xs font-semibold ml-auto" style={{ color }}>{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Trend */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-1">Weekly Transactions</h2>
        <p className="text-xs text-white/40 mb-5">Volume & value trend</p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={transactionTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            <Line yAxisId="left"  type="monotone" dataKey="transactions" stroke="#39FF14" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="value"        stroke="#FFB800" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
