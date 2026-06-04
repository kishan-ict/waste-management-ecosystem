'use client'

import { ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react'

const AUDITS = [
  { id: 'AUD-492', inspector: 'Bureau Veritas', date: 'May 28, 2026', block: '28,490', status: 'Passed' },
  { id: 'AUD-481', inspector: 'SGS India', date: 'May 14, 2026', block: '28,114', status: 'Passed' },
  { id: 'AUD-473', inspector: 'Green Audit Alliance', date: 'April 30, 2026', block: '27,940', status: 'Passed' },
]

export default function MobileIndustryCompliance() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">Compliance Audits</h2>
      
      <div className="p-6 rounded-3xl bg-gradient-to-br from-neon-lime/20 to-gp-900 border border-neon-lime/30 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gp-900 border-4 border-neon-lime flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.3)] mb-4 relative">
          <ShieldCheck className="w-10 h-10 text-neon-lime" />
          <div className="absolute -bottom-2 -right-2 bg-[#00FFD1] text-gp-950 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-gp-900">
            <Award className="w-3 h-3" /> Class A
          </div>
        </div>
        <div className="text-2xl font-display font-bold text-white mb-1">Fully Compliant</div>
        <div className="text-xs text-[#00FFD1] font-semibold uppercase tracking-widest">ISO 14001 certified</div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Recent Blockchain Audits</h3>
        {AUDITS.map((audit) => (
          <div key={audit.id} className="flex items-start gap-4 p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20">
            <CheckCircle2 className="w-6 h-6 text-neon-lime flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-bold text-white text-sm">{audit.inspector}</div>
              <div className="text-xs text-white/55 mt-0.5">Date: {audit.date} • Block: #{audit.block}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-neon-lime bg-neon-lime/10 px-2.5 py-0.5 rounded-full border border-neon-lime/20">
                {audit.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
