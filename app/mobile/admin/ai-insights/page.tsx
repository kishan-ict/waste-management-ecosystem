'use client'

import { Brain, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react'

const INSIGHTS = [
  { id: 1, type: 'prediction', title: 'PET Supply Peak', desc: 'Predicting 15% surge in PET waste collection across Mumbai Zone 2 tomorrow.', color: 'text-neon-lime bg-neon-lime/10 border-neon-lime/20' },
  { id: 2, type: 'anomaly', title: 'Trust Score Drop Alert', desc: 'Vendor ID #GP-9482 dropped 8 points in trust metrics within 48 hours.', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
  { id: 3, type: 'recommendation', title: 'Route Optimization', desc: 'Logistics routing efficiency can be increased by 8.4% by reallocating trucks.', color: 'text-[#B5FF5A] bg-[#B5FF5A]/10 border-[#B5FF5A]/20' },
]

export default function MobileAdminAIInsights() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Brain className="w-7 h-7 text-[#B5FF5A]" /> AI Insights
        </h2>
        <span className="text-[10px] font-bold text-[#B5FF5A] bg-[#B5FF5A]/10 border border-[#B5FF5A]/20 px-3 py-1 rounded-full uppercase tracking-wider">
          Models Active
        </span>
      </div>

      <div className="p-6 rounded-3xl bg-gp-800/40 border border-gp-700/30 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#B5FF5A]/10 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6 text-[#B5FF5A]" />
        </div>
        <div className="text-xl font-bold text-white">Neural Engine Nominal</div>
        <p className="text-xs text-white/50 max-w-xs mx-auto">
          Models processing real-time telemetry from 1,245 collection hubs, predictive confidence at 98.4%.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Active Signals</h3>
        {INSIGHTS.map((insight) => (
          <div key={insight.id} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{insight.title}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${insight.color}`}>
                {insight.type}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">{insight.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
