'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, Package, MapPin, BarChart3, Zap, AlertTriangle } from 'lucide-react'
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts'

const predictionData = [
  { date: 'Jun 4',  plastic: 3200, paper: 1800, metal: 900,  confidence: 87 },
  { date: 'Jun 5',  plastic: 3450, paper: 1950, metal: 850,  confidence: 85 },
  { date: 'Jun 6',  plastic: 3100, paper: 2100, metal: 920,  confidence: 82 },
  { date: 'Jun 7',  plastic: 3800, paper: 2200, metal: 1000, confidence: 79 },
  { date: 'Jun 8',  plastic: 4200, paper: 2400, metal: 1050, confidence: 76 },
  { date: 'Jun 9',  plastic: 4600, paper: 2300, metal: 980,  confidence: 73 },
  { date: 'Jun 10', plastic: 3900, paper: 2000, metal: 870,  confidence: 70 },
]

const zoneHotspots = [
  { zone: 'Dharavi, Mumbai',      score: 95, lat: 19.04,  lng: 72.85, material: 'Plastic', trend: 'up' },
  { zone: 'Karol Bagh, Delhi',    score: 88, lat: 28.65,  lng: 77.19, material: 'Metal',   trend: 'up' },
  { zone: 'Shivajinagar, Pune',   score: 82, lat: 18.53,  lng: 73.85, material: 'Paper',   trend: 'stable' },
  { zone: 'Lingarajapuram, Blr',  score: 78, lat: 12.99,  lng: 77.63, material: 'E-Waste', trend: 'up' },
  { zone: 'Aminjikarai, Chennai', score: 71, lat: 13.08,  lng: 80.22, material: 'Organic', trend: 'down' },
]

const aiInsightCards = [
  { icon: TrendingUp, color: '#39FF14', title: 'Supply Surge Alert', confidence: 87,
    detail: 'PET plastic expected to surge +23% in Mumbai West zone. Peak window: Jun 7-9. Consider pre-booking with Rajesh Kumar (Trust: 94).' },
  { icon: Package,    color: '#FFB800', title: 'Price Opportunity',  confidence: 81,
    detail: 'Metal scrap prices dropping across Delhi NCR. 15% below Q1 average. High ROI window for bulk procurement this week.' },
  { icon: MapPin,     color: '#00FFD1', title: 'New Zone Intelligence', confidence: 74,
    detail: 'Commercial district waste generation spiking in Bengaluru South after tech park expansion. New collection opportunity.' },
  { icon: AlertTriangle, color: '#FF3860', title: 'Supply Gap Warning', confidence: 90,
    detail: 'E-waste supply expected to drop 18% due to monsoon collection delays. Diversify to metal category during this period.' },
]

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-lime/10 flex items-center justify-center">
            <Brain className="w-5 h-5 text-neon-lime" />
          </div>
          AI Supply Intelligence
        </h1>
        <p className="text-white/40 text-sm mt-1">Predictive waste analytics powered by GREENPACK AI</p>
      </div>

      {/* Model Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Prediction Accuracy', value: '87.3%', color: '#39FF14', icon: Brain },
          { label: 'Data Points Analyzed', value: '2.4M',  color: '#FFB800', icon: BarChart3 },
          { label: 'Active Forecast Zones', value: '24',   color: '#00FFD1', icon: MapPin },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="gp-card stat-card p-4 text-center">
            <Icon className="w-6 h-6 mx-auto mb-2" style={{ color }} />
            <div className="font-display font-bold text-2xl" style={{ color }}>{value}</div>
            <div className="text-xs text-white/40 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast Chart */}
      <div className="gp-card p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-semibold text-white">7-Day Material Supply Forecast</h2>
            <p className="text-xs text-white/40 mt-0.5">AI prediction with confidence intervals (KG)</p>
          </div>
          <div className="flex items-center gap-2 glass rounded-lg px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-neon-lime" />
            <span className="text-xs font-mono text-neon-lime">GREENPACK-TS-v1</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={predictionData}>
            <defs>
              {[['plastic', '#39FF14'], ['paper', '#FFB800'], ['metal', '#00FFD1']].map(([k, c]) => (
                <linearGradient key={k} id={`ai-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={c} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }}
              formatter={(v, n) => [`${v} KG`, String(n).charAt(0).toUpperCase() + String(n).slice(1)]} />
            <Area type="monotone" dataKey="plastic" stroke="#39FF14" fill="url(#ai-plastic)" strokeWidth={2} />
            <Area type="monotone" dataKey="paper"   stroke="#FFB800" fill="url(#ai-paper)"   strokeWidth={2} />
            <Area type="monotone" dataKey="metal"   stroke="#00FFD1" fill="url(#ai-metal)"   strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neon-green" /><span className="text-xs text-white/40">Plastic</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-neon-amber" /><span className="text-xs text-white/40">Paper</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ background: '#00FFD1' }} /><span className="text-xs text-white/40">Metal</span></div>
          <div className="ml-auto text-xs text-white/30 font-mono">Shaded area = confidence interval</div>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsightCards.map(({ icon: Icon, color, title, confidence, detail }, i) => (
          <motion.div
            key={title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="gp-card p-5"
            style={{ borderLeft: `3px solid ${color}50` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${color}15`, color }}>
                    {confidence}% conf.
                  </span>
                </div>
                <div className="text-xs text-neon-lime font-mono mt-0.5">AI INSIGHT</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">{detail}</p>
            <div className="mt-4 gp-progress">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="gp-progress-bar"
                style={{ background: `linear-gradient(90deg, ${color}60, ${color})` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Zone Hotspots Table */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-4">High-Waste Zone Intelligence</h2>
        <div className="overflow-x-auto">
          <table className="gp-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Waste Score</th>
                <th>Top Material</th>
                <th>Trend</th>
                <th>AI Confidence</th>
              </tr>
            </thead>
            <tbody>
              {zoneHotspots.map((zone) => (
                <tr key={zone.zone}>
                  <td>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-white/80">{zone.zone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-20 gp-progress">
                        <div className="gp-progress-bar" style={{ width: `${zone.score}%` }} />
                      </div>
                      <span className="text-xs text-neon-lime">{zone.score}</span>
                    </div>
                  </td>
                  <td><span className="text-white/70">{zone.material}</span></td>
                  <td>
                    <span className={`text-xs font-semibold ${
                      zone.trend === 'up' ? 'text-neon-green' : zone.trend === 'down' ? 'text-red-400' : 'text-neon-amber'
                    }`}>
                      {zone.trend === 'up' ? '↑ Rising' : zone.trend === 'down' ? '↓ Falling' : '→ Stable'}
                    </span>
                  </td>
                  <td><span className="text-xs font-mono text-white/50">{70 + Math.floor(Math.random() * 20)}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
