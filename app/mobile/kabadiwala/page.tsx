'use client'

import { motion } from 'framer-motion'
import { Package, TrendingUp, Users, ChevronRight, CheckCircle, Shield } from 'lucide-react'
import Link from 'next/link'

export default function MobileKabadiwalaHome() {
  return (
    <div className="space-y-6">
      
      {/* Mobile Style Trust Score Card */}
      <motion.div 
        className="relative overflow-hidden rounded-3xl p-5"
        style={{
          background: 'linear-gradient(135deg, rgba(57,255,20,0.15) 0%, rgba(13,18,8,1) 100%)',
          border: '1px solid rgba(57,255,20,0.2)'
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Shield className="w-24 h-24 text-neon-lime" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-neon-lime mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Trusted Partner
            </div>
            <div className="text-4xl font-display font-bold text-white tracking-tight">94<span className="text-xl text-white/50">/100</span></div>
            <div className="text-xs text-white/60 mt-1">Excellent Standing</div>
          </div>
          <Link href="/mobile/kabadiwala/trust" className="w-10 h-10 rounded-full bg-neon-lime text-gp-950 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.4)]">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      {/* Grid of iOS-Style Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-neon-lime/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-neon-lime" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neon-lime/20 text-neon-lime">+12%</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">847</div>
            <div className="text-xs text-white/50 mt-0.5">KG Collected</div>
          </div>
        </div>

        <div className="rounded-3xl bg-gp-800/40 border border-gp-700/30 p-4 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-neon-amber/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-neon-amber" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neon-amber/20 text-neon-amber">Up</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">₹4.2k</div>
            <div className="text-xs text-white/50 mt-0.5">Revenue Today</div>
          </div>
        </div>
      </div>

      {/* Quick Actions (iOS Style Buttons) */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider ml-2">Quick Actions</h2>
        
        <Link href="/mobile/kabadiwala/log" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-neon-lime/10 flex items-center justify-center mr-4">
            <Package className="w-5 h-5 text-neon-lime" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">Log New Waste</div>
            <div className="text-xs text-white/50">Record an incoming transaction</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </Link>

        <Link href="/mobile/kabadiwala/pickers" className="flex items-center p-4 rounded-2xl bg-gp-800/40 border border-gp-700/30 active:scale-[0.98] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center mr-4">
            <Users className="w-5 h-5 text-neon-cyan" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">Manage Pickers</div>
            <div className="text-xs text-white/50">View active waste pickers</div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20" />
        </Link>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-3 pb-6">
        <div className="flex items-center justify-between ml-2 mr-2">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Recent Activity</h2>
          <Link href="/mobile/kabadiwala/history" className="text-xs text-neon-lime">View All</Link>
        </div>
        <div className="rounded-3xl bg-gp-800/30 border border-gp-700/20 overflow-hidden divide-y divide-gp-700/20">
          {[
            { id: 1, type: 'PET Plastics', qty: '120 KG', time: '10m ago', val: '+ ₹1,200', color: '#00FFD1' },
            { id: 2, type: 'Cardboard',    qty: '350 KG', time: '2h ago',  val: '+ ₹2,100', color: '#FFB800' },
            { id: 3, type: 'Mixed Metal',  qty: '85 KG',  time: '4h ago',  val: '+ ₹3,400', color: '#B5FF5A' },
          ].map(item => (
            <div key={item.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                <div>
                  <div className="text-sm font-semibold text-white">{item.type}</div>
                  <div className="text-xs text-white/40">{item.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">{item.val}</div>
                <div className="text-xs text-white/50">{item.qty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}
