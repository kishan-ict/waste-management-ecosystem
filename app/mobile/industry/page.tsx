'use client'

import { motion } from 'framer-motion'
import { Package, TrendingUp, Star, ChevronRight, Brain, CheckSquare, FileCheck } from 'lucide-react'
import Link from 'next/link'

export default function MobileIndustryHome() {
  return (
    <div className="space-y-6">
      
      {/* AI Supply Card */}
      <motion.div 
        className="relative overflow-hidden rounded-3xl p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(0,255,209,0.15) 0%, rgba(13,18,8,1) 100%)',
          border: '1px solid rgba(0,255,209,0.2)'
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain className="w-24 h-24 text-[#00FFD1]" />
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-[#00FFD1] mb-2 uppercase tracking-wider flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-pulse" /> AI Prediction
          </div>
          <div className="text-3xl font-display font-bold text-white tracking-tight mb-1">Peak Supply</div>
          <div className="text-sm text-white/70 max-w-[200px] mb-4">PET Plastic supply is expected to surge by 15% this weekend.</div>
          
          <button className="px-5 py-2 rounded-full bg-[#00FFD1]/20 text-[#00FFD1] font-semibold text-sm border border-[#00FFD1]/30">
            Adjust Procurement
          </button>
        </div>
      </motion.div>

      {/* Grid of iOS-Style Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-[#00FFD1]/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-[#00FFD1]" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00FFD1]/20 text-[#00FFD1]">+5</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">48</div>
            <div className="text-xs text-white/50 mt-0.5">Active Listings</div>
          </div>
        </div>

        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-neon-amber/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-neon-amber" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-xs text-white/50 mt-0.5">Trusted Suppliers</div>
          </div>
        </div>
      </div>

      {/* Quick Actions (iOS Style Buttons) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider ml-2">Quick Actions</h2>
        
        <Link href="/mobile/industry/match" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mr-4">
            <CheckSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">Review Matches</div>
            <div className="text-xs text-white/50">3 new supply requests pending</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </Link>

        <Link href="/mobile/industry/certs" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4">
            <FileCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">Certificates</div>
            <div className="text-xs text-white/50">View blockchain green certs</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </Link>
      </div>
      
    </div>
  )
}

