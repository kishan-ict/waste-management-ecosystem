'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, MapPin, Package, AlertTriangle, Zap, Star } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const insightCards = [
  {
    id: 'AI-001', icon: TrendingUp, color: '#39FF14', priority: 'critical',
    title: 'Plastic Supply Surge — Mumbai',
    body: 'PET plastic availability predicted to increase by +31% in Mumbai West zone over next 14 days. Two verified kabadiwalas (KB-1023, KB-0445) are primed for bulk orders. Industry demand from EcoRecycle Ltd already high.',
    confidence: 91, category: 'Supply Prediction', generated: '6 min ago',
  },
  {
    id: 'AI-002', icon: AlertTriangle, color: '#FF3860', priority: 'high',
    title: 'Fraud Pattern Detected — Pune',
    body: 'Abnormal registration velocity in Pune West zone. 3 kabadiwala accounts registered 11 new pickers in 6 hours — statistically anomalous. Recommend immediate review of KB-2234 and associated picker IDs.',
    confidence: 88, category: 'Fraud Intelligence', generated: '22 min ago',
  },
  {
    id: 'AI-003', icon: MapPin, color: '#FFB800', priority: 'medium',
    title: 'New High-Waste Zone Identified',
    body: 'Sector 14, Noida showing elevated waste generation signals (satellite imagery + pickup frequency data). No registered kabadiwala present. High ROI opportunity for ecosystem expansion.',
    confidence: 74, category: 'Zone Intelligence', generated: '1h ago',
  },
  {
    id: 'AI-004', icon: Star, color: '#00FFD1', priority: 'low',
    title: 'Top Supplier Milestone',
    body: 'Rajesh Kumar (KB-1023) has completed 500 verified blockchain transactions with zero fraud flags. Recommend Platinum Trust Badge upgrade. Industry partner EcoRecycle has rated him 4.9 over 50+ transactions.',
    confidence: 99, category: 'Trust Intelligence', generated: '2h ago',
  },
  {
    id: 'AI-005', icon: Package, color: '#B5FF5A', priority: 'medium',
    title: 'Cardboard Glut Warning — Delhi',
    body: 'Post-festive season cardboard oversupply detected in Delhi NCR. 3 kabadiwalas holding combined 8 tonnes of unsold cardboard. Price per KG likely to drop 20-25%. Alert industry buyers to buy now.',
    confidence: 83, category: 'Market Intelligence', generated: '3h ago',
  },
]

const priorityMap: Record<string, { color: string; label: string }> = {
  critical: { color: '#FF3860', label: 'CRITICAL' },
  high:     { color: '#FFB800', label: 'HIGH'     },
  medium:   { color: '#B5FF5A', label: 'MEDIUM'   },
  low:      { color: '#39FF14', label: 'LOW'       },
}

const trendData = [
  { t: '00:00', signals: 12 }, { t: '04:00', signals: 8  }, { t: '08:00', signals: 24 },
  { t: '12:00', signals: 38 }, { t: '16:00', signals: 45 }, { t: '20:00', signals: 31 },
  { t: '24:00', signals: 18 },
]

export default function AdminAIInsightsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-lime/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-neon-lime" />
            </div>
            AI Intelligence Feed
          </h1>
          <p className="text-white/40 text-sm mt-1">Real-time insights from GREENPACK-AI engine</p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <div className="glow-dot" />
          <span className="text-xs font-mono text-neon-lime">AI ENGINE ACTIVE · {insightCards.length} INSIGHTS</span>
        </div>
      </div>

      {/* Model Activity Chart */}
      <div className="gp-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white">AI Signal Activity — Today</h2>
          <div className="flex items-center gap-1.5 text-xs text-white/30 font-mono">
            <Zap className="w-3.5 h-3.5 text-neon-lime" /> GREENPACK-AI v1.2
          </div>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="aiSignal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#39FF14" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#39FF14" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" />
            <YAxis />
            <Tooltip contentStyle={{ background: '#0D1208', border: '1px solid rgba(84,106,47,0.4)', borderRadius: 8 }} />
            <Area type="monotone" dataKey="signals" stroke="#39FF14" fill="url(#aiSignal)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {insightCards.map((insight, i) => {
          const pri = priorityMap[insight.priority]
          return (
            <motion.div key={insight.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="gp-card p-5"
              style={{ borderLeft: `3px solid ${insight.color}60` }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${insight.color}15` }}>
                    <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{insight.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/30 font-mono">{insight.id}</span>
                      <span className="text-xs text-white/30">·</span>
                      <span className="text-xs" style={{ color: insight.color }}>{insight.category}</span>
                      <span className="text-xs text-white/30">·</span>
                      <span className="text-xs text-white/30">{insight.generated}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${pri.color}15`, color: pri.color, border: `1px solid ${pri.color}30` }}>
                  {pri.label}
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-4">{insight.body}</p>

              {/* Confidence */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/30">Confidence:</span>
                <div className="w-32 gp-progress">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${insight.confidence}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="gp-progress-bar"
                    style={{ background: `linear-gradient(90deg, ${insight.color}60, ${insight.color})` }} />
                </div>
                <span className="text-xs font-mono font-semibold" style={{ color: insight.color }}>
                  {insight.confidence}%
                </span>
                <button className="ml-auto text-xs px-3 py-1.5 rounded-lg border transition-colors"
                  style={{ borderColor: `${insight.color}30`, color: insight.color }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${insight.color}10`)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  Take Action →
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
