'use client'

import { useState } from 'react'
import { Settings, LogOut, ChevronRight, Shield, Bell, User as UserIcon, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function MobileKabadiwalaProfile() {
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
          <AlertCircle className="w-4 h-4 text-neon-amber" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center pt-4 pb-6">
        <div className="w-24 h-24 rounded-full bg-gp-800 border-2 border-neon-lime flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.2)] mb-4">
          <span className="text-3xl font-bold text-neon-lime">RK</span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Rajesh Kumar</h2>
        <p className="text-sm text-white/50 mt-1">kabadiwala@greenpack.in</p>
        
        <div className="mt-4 px-4 py-1.5 rounded-full bg-neon-lime/10 text-neon-lime text-xs font-bold uppercase tracking-widest border border-neon-lime/20">
          Trust Score 94
        </div>
      </div>

      {/* Settings List iOS Style */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-wider ml-4 mb-2">Account</h3>
          <div className="bg-gp-800/30 rounded-3xl border border-gp-700/20 overflow-hidden divide-y divide-gp-700/30">
            <button onClick={() => showToast('Personal Information feature coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                <UserIcon className="w-4 h-4 text-blue-400 pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">Personal Information</span>
              <ChevronRight className="w-4 h-4 text-white/20 pointer-events-none" />
            </button>
            <button onClick={() => showToast('Security settings coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-neon-amber/10 flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-neon-amber pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">Security & Privacy</span>
              <ChevronRight className="w-4 h-4 text-white/20 pointer-events-none" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-wider ml-4 mb-2">Preferences</h3>
          <div className="bg-gp-800/30 rounded-3xl border border-gp-700/20 overflow-hidden divide-y divide-gp-700/30">
            <button onClick={() => showToast('Notification settings coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mr-3">
                <Bell className="w-4 h-4 text-purple-400 pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">Notifications</span>
              <ChevronRight className="w-4 h-4 text-white/20 pointer-events-none" />
            </button>
            <button onClick={() => showToast('App Settings coming soon!')} className="w-full flex items-center p-4 active:bg-gp-800/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-500/10 flex items-center justify-center mr-3">
                <Settings className="w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <span className="flex-1 text-left text-sm font-medium text-white pointer-events-none">App Settings</span>
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
