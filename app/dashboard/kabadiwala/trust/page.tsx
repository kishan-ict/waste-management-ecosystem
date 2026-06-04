'use client'

import { motion } from 'framer-motion'
import { Star, Shield, TrendingUp, Award, CheckCircle, Clock } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const radarData = [
  { subject: 'Consistency',  A: 96 },
  { subject: 'Quality',      A: 92 },
  { subject: 'Delivery',     A: 95 },
  { subject: 'Volume',       A: 88 },
  { subject: 'Reliability',  A: 91 },
]

const HISTORY = [
  { date: '2024-06-01', event: 'Industry feedback received (4.9★)',  delta: +3, score: 94, by: 'EcoRecycle Ltd'    },
  { date: '2024-05-28', event: 'Blockchain transaction verified',     delta: +1, score: 91, by: 'System'            },
  { date: '2024-05-25', event: 'Quality upgrade — Grade B → Grade A', delta: +2, score: 90, by: 'Industry feedback' },
  { date: '2024-05-20', event: 'New picker registered (Ramesh)',       delta: +1, score: 88, by: 'Platform action'   },
  { date: '2024-05-15', event: 'Monthly consistency milestone',        delta: +2, score: 87, by: 'Auto system'       },
  { date: '2024-05-10', event: 'Late delivery reported',              delta: -2, score: 85, by: 'GreenMetal Co'     },
]

export default function TrustScorePage() {
  const currentScore = 94
  const badge = currentScore >= 90 ? 'GOLD' : currentScore >= 75 ? 'SILVER' : 'BRONZE'
  const badgeColor = badge === 'GOLD' ? '#FFB800' : badge === 'SILVER' ? '#C0C0C0' : '#CD7F32'

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-white">Trust Score</h1>
        <p className="text-white/40 text-sm mt-1">Your GREENPACK reputation & credibility index</p>
      </div>

      {/* Score Hero */}
      <div className="gp-card p-8 text-center" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.06), transparent 70%)' }}>
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-neon-lime/30 flex flex-col items-center justify-center mx-auto"
            style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.1), rgba(13,18,8,0.8))' }}>
            <div className="font-display font-bold text-5xl text-neon-lime">{currentScore}</div>
            <div className="text-xs text-white/40">/100</div>
          </div>
        </div>
        <div className="text-sm font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-3"
          style={{ background: `${badgeColor}15`, color: badgeColor, border: `1px solid ${badgeColor}30` }}>
          <Award className="w-4 h-4" /> {badge} BADGE
        </div>
        <h2 className="font-display font-bold text-xl text-white mb-1">Excellent Standing</h2>
        <p className="text-sm text-white/40">You are ranked <span className="text-neon-lime font-semibold">#3</span> out of 578 kabadiwalas nationally</p>
      </div>

      {/* Factor Breakdown + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-4">Performance Radar</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(84,106,47,0.25)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(232,240,216,0.5)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Score" dataKey="A" stroke="#39FF14" fill="#39FF14" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Factor Bars */}
        <div className="gp-card p-5">
          <h2 className="font-display font-semibold text-white mb-4">Score Breakdown</h2>
          <div className="space-y-4">
            {radarData.map(({ subject, A }) => (
              <div key={subject}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-white/60">{subject}</span>
                  <span className="text-sm font-bold text-neon-lime">{A}</span>
                </div>
                <div className="gp-progress">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${A}%` }}
                    transition={{ duration: 1 }} className="gp-progress-bar" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-3 rounded-xl glass">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Shield className="w-4 h-4 text-neon-lime" />
              Trust score is updated daily based on industry feedback, blockchain confirmations, and consistency metrics.
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-4">Achievement Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🏆', label: '500 Transactions',  earned: true,  color: '#FFB800' },
            { icon: '⚡', label: 'Fast Responder',     earned: true,  color: '#39FF14' },
            { icon: '💎', label: 'Quality Master',     earned: true,  color: '#00FFD1' },
            { icon: '🌱', label: 'Eco Champion',       earned: false, color: '#B5FF5A' },
          ].map(({ icon, label, earned, color }) => (
            <div key={label}
              className="p-4 rounded-xl border text-center transition-all"
              style={{
                background: earned ? `${color}12` : 'rgba(84,106,47,0.04)',
                borderColor: earned ? `${color}30` : 'rgba(84,106,47,0.15)',
                opacity: earned ? 1 : 0.5,
              }}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-xs font-semibold" style={{ color: earned ? color : 'rgba(255,255,255,0.3)' }}>
                {label}
              </div>
              {!earned && <div className="text-xs text-white/20 mt-1">Locked</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Score History */}
      <div className="gp-card p-5">
        <h2 className="font-display font-semibold text-white mb-4">Score History</h2>
        <div className="space-y-3">
          {HISTORY.map((h, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-gp-900/50">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                h.delta > 0 ? 'bg-neon-green/10 text-neon-green' : 'bg-red-500/10 text-red-400'
              }`}>
                {h.delta > 0 ? `+${h.delta}` : h.delta}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/80">{h.event}</div>
                <div className="text-xs text-white/30 mt-0.5">{h.by} · {h.date}</div>
              </div>
              <div className="text-sm font-bold text-neon-lime flex-shrink-0">{h.score}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
