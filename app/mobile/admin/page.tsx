'use client'

import { motion } from 'framer-motion'
import { Activity, ShieldAlert, Users, TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function MobileAdminHome() {
  return (
    <div className="space-y-6">
      
      {/* Global Status Card */}
      <motion.div 
        className="relative overflow-hidden rounded-3xl p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(181,255,90,0.15) 0%, rgba(13,18,8,1) 100%)',
          border: '1px solid rgba(181,255,90,0.2)'
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity className="w-24 h-24 text-[#B5FF5A]" />
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-[#B5FF5A] mb-2 uppercase tracking-wider flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#B5FF5A] shadow-[0_0_8px_#B5FF5A]" /> Global Radar
          </div>
          <div className="text-3xl font-display font-bold text-white tracking-tight mb-1">System Nominal</div>
          <div className="text-sm text-white/70 max-w-[200px] mb-4">All AI nodes and blockchain networks are operating correctly.</div>
          
          <button className="px-5 py-2 rounded-full bg-[#B5FF5A]/20 text-[#B5FF5A] font-semibold text-sm border border-[#B5FF5A]/30">
            View Metrics
          </button>
        </div>
      </motion.div>

      {/* Grid of iOS-Style Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">High Priority</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">4</div>
            <div className="text-xs text-white/50 mt-0.5">Active Alerts</div>
          </div>
        </div>

        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#B5FF5A]/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#B5FF5A]" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">1.2k</div>
            <div className="text-xs text-white/50 mt-0.5">Total Users</div>
          </div>
        </div>
      </div>

      {/* Quick Actions (iOS Style Buttons) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider ml-2">Admin Tools</h2>
        
        <Link href="/mobile/admin/fraud" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full" />
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mr-4 relative z-10">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1 relative z-10">
            <div className="text-base font-semibold text-white flex items-center gap-2">
              Fraud Center <span className="flex h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <div className="text-xs text-white/50">Investigate anomalies</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20 relative z-10" />
        </Link>

        <Link href="/mobile/admin/users" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">User Directory</div>
            <div className="text-xs text-white/50">Manage access and trust scores</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </Link>
      </div>
      
    </div>
  )
}
