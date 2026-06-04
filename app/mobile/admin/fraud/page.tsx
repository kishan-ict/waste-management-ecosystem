'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, CheckCircle, XCircle, Search, AlertTriangle } from 'lucide-react'

const ALERTS = [
  { id: '1', user: 'GreenMill Ind', type: 'Weight Mismatch', conf: '98%', sev: 'high',  loc: 'Mumbai' },
  { id: '2', user: 'Suresh V.',     type: 'GPS Spoofing',    conf: '94%', sev: 'high',  loc: 'Delhi' },
  { id: '3', user: 'EcoRecycle',    type: 'Double Spend',    conf: '85%', sev: 'med',   loc: 'Bangalore' },
]

export default function MobileAdminFraud() {
  const [alerts, setAlerts] = useState(ALERTS)
  const [swipedId, setSwipedId] = useState<string | null>(null)

  const handleAction = (id: string, action: 'resolve' | 'ban') => {
    setSwipedId(id)
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id))
      setSwipedId(null)
    }, 300)
  }

  return (
    <div className="space-y-4 pb-8 overflow-x-hidden">
      {/* iOS Header */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Active Alerts</h2>
        <div className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3" /> {alerts.length} High Risk
        </div>
      </div>

      <div className="text-xs text-white/40 mb-4 ml-1">Swipe left to ban, right to resolve.</div>

      {/* Swipeable List */}
      <div className="space-y-3 relative">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: swipedId === alert.id ? -100 : 100 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100) handleAction(alert.id, 'resolve')
                else if (offset.x < -100) handleAction(alert.id, 'ban')
              }}
              className="relative rounded-3xl bg-gp-800/40 border border-gp-700/30 overflow-hidden touch-pan-y"
            >
              {/* Background Actions (Visible when swiping) */}
              <div className="absolute inset-0 flex justify-between items-center px-6 -z-10 bg-gp-900">
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                  <XCircle className="w-5 h-5" /> Ban
                </div>
                <div className="flex items-center gap-2 text-neon-lime font-bold text-sm">
                  Resolve <CheckCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Foreground Card */}
              <motion.div 
                className="p-5 bg-gp-800 rounded-3xl border border-gp-700 flex flex-col"
                whileDrag={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldAlert className="w-3 h-3" /> {alert.type}
                    </div>
                    <div className="text-lg font-bold text-white">{alert.user}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">AI Confidence</div>
                    <div className="text-lg font-bold text-white">{alert.conf}</div>
                  </div>
                </div>
                <div className="text-xs text-white/40">{alert.loc}</div>
              </motion.div>
            </motion.div>
          ))}
          {alerts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-neon-lime/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-neon-lime" />
              </div>
              <p className="text-white font-bold text-lg">All Clear!</p>
              <p className="text-white/50 text-sm">No active fraud alerts.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
