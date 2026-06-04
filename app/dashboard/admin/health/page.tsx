'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Server, Database, Brain, Globe, Cpu, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const generatePoints = (base: number, variance: number, n: number) =>
  Array.from({ length: n }, (_, i) => ({
    t: `${i}s`, v: +(base + (Math.random() - 0.5) * variance).toFixed(1)
  }))

const SERVICES = [
  { id: 'api',        icon: Globe,     name: 'API Gateway',      status: 'healthy', uptime: 99.97, latency: '42ms',  region: 'Mumbai, IN'    },
  { id: 'db',         icon: Database,  name: 'PostgreSQL DB',    status: 'healthy', uptime: 100,   latency: '8ms',   region: 'Mumbai, IN'    },
  { id: 'redis',      icon: Server,    name: 'Redis Cache',      status: 'healthy', uptime: 99.99, latency: '2ms',   region: 'Mumbai, IN'    },
  { id: 'ai',         icon: Brain,     name: 'AI Engine',        status: 'healthy', uptime: 96.20, latency: '180ms', region: 'Bengaluru, IN' },
  { id: 'blockchain', icon: Globe,     name: 'Polygon Node',     status: 'healthy', uptime: 99.90, latency: '320ms', region: 'Global'        },
  { id: 'cdn',        icon: Cpu,       name: 'CDN / Frontend',   status: 'healthy', uptime: 99.95, latency: '18ms',  region: 'Mumbai, IN'    },
]

export default function SystemHealthPage() {
  const [cpuData,  setCpuData]  = useState(generatePoints(34, 15, 20))
  const [memData,  setMemData]  = useState(generatePoints(61, 10, 20))
  const [apiData,  setApiData]  = useState(generatePoints(420, 100, 20))
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const refresh = () => {
    setCpuData(generatePoints(34, 15, 20))
    setMemData(generatePoints(61, 10, 20))
    setApiData(generatePoints(420, 100, 20))
    setLastRefresh(new Date())
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-lime/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-neon-lime" />
            </div>
            System Health Monitor
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <button onClick={refresh}
          className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 text-sm text-neon-lime hover:bg-neon-lime/10 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Overall Status Banner */}
      <div className="glass rounded-xl p-4 border border-neon-lime/20 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-neon-lime/10 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-neon-lime" />
        </div>
        <div>
          <div className="font-semibold text-white">All Systems Operational</div>
          <div className="text-xs text-white/40 mt-0.5">6 services healthy · 0 incidents · SLA: 99.9%</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="glow-dot" />
          <span className="text-xs font-mono text-neon-lime">LIVE MONITORING</span>
        </div>
      </div>

      {/* Service Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((svc, i) => (
          <motion.div key={svc.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            className="gp-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gp-800 flex items-center justify-center">
                  <svc.icon className="w-4.5 h-4.5 text-neon-lime w-[18px] h-[18px]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{svc.name}</div>
                  <div className="text-xs text-white/30">{svc.region}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${svc.status === 'healthy' ? 'bg-neon-lime animate-pulse' : 'bg-red-500 animate-pulse'}`} />
                <span className={`text-xs font-semibold ${svc.status === 'healthy' ? 'text-neon-lime' : 'text-red-400'}`}>
                  {svc.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="glass rounded-lg p-2.5 text-center">
                <div className="text-sm font-bold text-white">{svc.uptime}%</div>
                <div className="text-xs text-white/30">Uptime</div>
              </div>
              <div className="glass rounded-lg p-2.5 text-center">
                <div className="text-sm font-bold text-neon-lime">{svc.latency}</div>
                <div className="text-xs text-white/30">Latency</div>
              </div>
            </div>
            <div className="mt-3 gp-progress">
              <div className="gp-progress-bar" style={{ width: `${svc.uptime}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { title: 'CPU Usage (%)',         data: cpuData,  color: '#39FF14', key: 'v' },
          { title: 'Memory Usage (%)',       data: memData,  color: '#FFB800', key: 'v' },
          { title: 'API Requests / min',     data: apiData,  color: '#00FFD1', key: 'v' },
        ].map(({ title, data, color, key }) => (
          <div key={title} className="gp-card p-5">
            <h3 className="text-sm font-semibold text-white/70 mb-3">{title}</h3>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={data}>
                <XAxis dataKey="t" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: '#0D1208', border: `1px solid ${color}40`, borderRadius: 8 }}
                  formatter={(v: number) => [`${v}`, title.split(' ')[0]]} />
                <Line type="monotone" dataKey={key} stroke={color} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}
