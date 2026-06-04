'use client'

import { BarChart3, TrendingUp, Shield, Globe2 } from 'lucide-react'

export default function MobileIndustryAnalytics() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">ESG Analytics</h2>
      
      <div className="p-6 rounded-3xl bg-gp-800/40 border border-gp-700/30 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#00FFD1]/10 flex items-center justify-center mx-auto">
          <Globe2 className="w-8 h-8 text-[#00FFD1]" />
        </div>
        <div className="text-3xl font-bold text-white">14.2 Tons</div>
        <div className="text-sm text-white/50">Total Carbon (CO2) Offset</div>
        <div className="flex items-center justify-center gap-2 text-[#00FFD1] text-xs font-bold bg-[#00FFD1]/10 py-1.5 px-4 rounded-full w-fit mx-auto">
          <TrendingUp className="w-3 h-3" /> +18.4% improvement
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20">
          <span className="text-xs text-white/45">Circularity Index</span>
          <div className="text-xl font-bold text-white mt-1">87%</div>
          <div className="text-[10px] text-neon-lime mt-1 font-semibold">Grade A Target</div>
        </div>
        <div className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20">
          <span className="text-xs text-white/45">Monthly Spend</span>
          <div className="text-xl font-bold text-white mt-1">₹2.45L</div>
          <div className="text-[10px] text-white/40 mt-1">Budget Efficiency 92%</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Carbon Credit Breakdown</h3>
        <div className="p-4 rounded-2xl bg-gp-800/20 flex items-center justify-between">
          <span className="text-white">PET Recycled Credits</span>
          <span className="text-[#00FFD1] font-bold">8,450 kg CO2</span>
        </div>
        <div className="p-4 rounded-2xl bg-gp-800/20 flex items-center justify-between">
          <span className="text-white">Cardboard Recycled Credits</span>
          <span className="text-[#00FFD1] font-bold">5,750 kg CO2</span>
        </div>
      </div>
    </div>
  )
}
