'use client'

import { motion } from 'framer-motion'
import { Truck, Package, Box } from 'lucide-react'

export default function MobileInventory() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">Inventory</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Package className="w-6 h-6 text-neon-lime mb-2" />
          <div className="text-2xl font-bold text-white">4.2 <span className="text-sm text-white/50">Tons</span></div>
          <div className="text-xs text-white/50">PET Plastics</div>
        </div>
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Box className="w-6 h-6 text-neon-amber mb-2" />
          <div className="text-2xl font-bold text-white">1.8 <span className="text-sm text-white/50">Tons</span></div>
          <div className="text-xs text-white/50">Cardboard</div>
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30 flex items-center justify-center gap-2">
        <Truck className="w-5 h-5" /> Request Transport Pickup
      </button>
    </div>
  )
}
