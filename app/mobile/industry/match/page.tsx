'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, MapPin, Package, Star, Calendar } from 'lucide-react'

const REQUESTS = [
  { id: '1', mat: 'PET Plastics', qty: '1.2 Tons', sup: 'Rajesh K.', loc: 'Mumbai', dist: '12 km', score: 94, date: 'Today' },
  { id: '2', mat: 'Cardboard',    qty: '3.5 Tons', sup: 'Amit M.',   loc: 'Navi Mumbai', dist: '18 km', score: 88, date: 'Yesterday' },
  { id: '3', mat: 'Aluminium',    qty: '0.5 Tons', sup: 'Suresh V.', loc: 'Thane', dist: '25 km', score: 91, date: 'Oct 15' },
]

export default function MobileIndustryMatch() {
  const [requests, setRequests] = useState(REQUESTS)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const currentReq = requests[0]

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir)
    setTimeout(() => {
      setRequests(prev => prev.slice(1))
      setDirection(null)
    }, 300)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* iOS Header */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Supplier Match</h2>
        <div className="px-3 py-1 rounded-full bg-[#00FFD1]/10 text-[#00FFD1] text-xs font-bold">
          {requests.length} Pending
        </div>
      </div>

      {/* Tinder-like Card Stack */}
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence>
          {currentReq ? (
            <motion.div
              key={currentReq.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gp-800 border border-gp-700/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Card Image / Header Area */}
              <div className="h-48 bg-gp-900 relative p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                    <Package className="w-3 h-3" /> {currentReq.qty}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-neon-amber/20 backdrop-blur-md text-neon-amber text-xs font-bold flex items-center gap-1.5 border border-neon-amber/20">
                    <Star className="w-3 h-3" /> Score {currentReq.score}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white tracking-tight">{currentReq.mat}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/70 mt-1">
                    <Calendar className="w-4 h-4" /> Available {currentReq.date}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 bg-gp-800/50">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Supplier</div>
                    <div className="text-lg font-medium text-white">{currentReq.sup}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Location</div>
                    <div className="text-lg font-medium text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#00FFD1]" /> {currentReq.loc} <span className="text-sm text-white/40">({currentReq.dist})</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-white/40">
              <div className="w-16 h-16 rounded-full bg-gp-800 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <p className="font-medium">All caught up!</p>
              <p className="text-xs mt-1">No more pending requests.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="h-24 flex items-center justify-center gap-6 mt-4">
        <button 
          disabled={!currentReq}
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-gp-900 border border-gp-700 flex items-center justify-center text-red-400 active:scale-90 transition-transform disabled:opacity-50"
        >
          <X className="w-8 h-8" />
        </button>
        <button 
          disabled={!currentReq}
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/30 flex items-center justify-center text-[#00FFD1] active:scale-90 transition-transform shadow-[0_0_20px_rgba(0,255,209,0.2)] disabled:opacity-50"
        >
          <Check className="w-10 h-10" />
        </button>
      </div>
    </div>
  )
}
