'use client'

import { BarChart3, TrendingUp, DollarSign } from 'lucide-react'

export default function MobileAnalytics() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">Analytics</h2>
      
      <div className="p-6 rounded-3xl bg-gp-800/40 border border-gp-700/30 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
          <BarChart3 className="w-8 h-8 text-blue-400" />
        </div>
        <div className="text-3xl font-bold text-white">₹14,500</div>
        <div className="text-sm text-white/50">Total Revenue This Week</div>
        <div className="flex items-center justify-center gap-2 text-neon-lime text-xs font-bold bg-neon-lime/10 py-1.5 px-4 rounded-full w-fit mx-auto">
          <TrendingUp className="w-3 h-3" /> +12% from last week
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Top Materials</h3>
        <div className="p-4 rounded-2xl bg-gp-800/20 flex items-center justify-between">
          <span className="text-white">PET Plastics</span>
          <span className="text-[#00FFD1] font-bold">54%</span>
        </div>
        <div className="p-4 rounded-2xl bg-gp-800/20 flex items-center justify-between">
          <span className="text-white">Cardboard</span>
          <span className="text-[#00FFD1] font-bold">32%</span>
        </div>
      </div>
    </div>
  )
}
