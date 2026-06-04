'use client'

import { Star, ShieldCheck, Award } from 'lucide-react'

export default function MobileTrust() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">Trust Score</h2>
      
      <div className="p-8 rounded-3xl bg-gradient-to-br from-neon-amber/20 to-gp-900 border border-neon-amber/30 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gp-900 border-4 border-neon-amber flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.3)] mb-4 relative">
          <Star className="w-10 h-10 text-neon-amber" />
          <div className="absolute -bottom-2 -right-2 bg-neon-lime text-gp-950 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-gp-900">
            <Award className="w-3 h-3" /> Top 5%
          </div>
        </div>
        <div className="text-5xl font-display font-bold text-white mb-2">94</div>
        <div className="text-sm text-neon-amber font-semibold uppercase tracking-widest">Excellent Standing</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gp-800/30">
          <ShieldCheck className="w-6 h-6 text-neon-lime flex-shrink-0" />
          <div>
            <div className="font-bold text-white mb-1">Verified Supplier</div>
            <div className="text-sm text-white/50">Your account is fully KYC verified on the blockchain.</div>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gp-800/30">
          <Star className="w-6 h-6 text-neon-amber flex-shrink-0" />
          <div>
            <div className="font-bold text-white mb-1">Quality Bonus</div>
            <div className="text-sm text-white/50">Consecutive Grade A materials logged.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
