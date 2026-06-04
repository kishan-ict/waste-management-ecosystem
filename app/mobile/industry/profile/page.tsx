'use client'

import { useState } from 'react'
import { Settings, LogOut, ChevronRight, Shield, Bell, Building, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function MobileIndustryProfile() {
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Custom Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-gp-800 border border-gp-700/50 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertCircle className="w-4 h-4 text-neon-amber pointer-events-none" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center pt-4 pb-6">
        <div className="w-24 h-24 rounded-full bg-gp-800 border-2 border-[#00FFD1] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,209,0.2)] mb-4">
          <Building className="w-10 h-10 text-[#00FFD1]" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">EcoRecycle Ltd</h2>
        <p className="text-sm text-white/50 mt-1">contact@ecorecycle.in</p>
        
        <div className="mt-4 px-4 py-1.5 rounded-full bg-[#00FFD1]/10 text-[#00FFD1] text-xs font-bold uppercase tracking-widest border border-[#00FFD1]/20">
          Enterprise Account
        </div>
      </div>

      {/* Settings List iOS Style */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-wider ml-4 mb-2">Company</h3>
          <div className="bg-gp-800/30 rounded-3xl border border-gp-700/20 overflow-hidden divide-y divide-gp-700/30">
            <button onClick={() => showToast('Company Profile settings coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                <Building className="w-4 h-4 text-blue-400 pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">Company Profile</span>
              <ChevronRight className="w-4 h-4 text-white/20 pointer-events-none" />
            </button>
            <button onClick={() => showToast('Security & API settings coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-neon-amber/10 flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-neon-amber pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">Security & API Keys</span>
              <ChevronRight className="w-4 h-4 text-white/20 pointer-events-none" />
            </button>
          </div>
        </div>

        <Link href="/auth/login" className="flex items-center justify-center p-4 mt-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold active:scale-95 transition-transform">
          <LogOut className="w-5 h-5 mr-2" /> Log Out
        </Link>
      </div>
    </div>
  )
}
