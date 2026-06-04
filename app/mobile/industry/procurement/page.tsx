'use client'

import { motion } from 'framer-motion'
import { Truck, Package, Box, ChevronRight, FileText } from 'lucide-react'

const ORDERS = [
  { id: 'GP-4091', material: 'PET Plastics', qty: '5.0 Tons', status: 'Pending Pickup', color: 'text-neon-amber bg-neon-amber/10 border-neon-amber/20' },
  { id: 'GP-4088', material: 'Corrugated Cardboard', qty: '2.5 Tons', status: 'In Transit', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { id: 'GP-4082', material: 'HDPE Granules', qty: '8.4 Tons', status: 'Delivered', color: 'text-neon-lime bg-neon-lime/10 border-neon-lime/20' },
]

export default function MobileProcurement() {
  return (
    <div className="space-y-6 pb-8">
      <h2 className="text-2xl font-display font-bold text-white">Procurement Orders</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Package className="w-6 h-6 text-[#00FFD1] mb-2" />
          <div className="text-2xl font-bold text-white">15.9 <span className="text-sm text-white/50">Tons</span></div>
          <div className="text-xs text-white/50">Ordered This Month</div>
        </div>
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Truck className="w-6 h-6 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">2 <span className="text-sm text-white/50">Active</span></div>
          <div className="text-xs text-white/50">Shipments In Transit</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Recent Orders</h3>
        {ORDERS.map((order) => (
          <div key={order.id} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gp-850 border border-gp-700/40 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white/70" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">{order.material} ({order.qty})</div>
                <div className="text-xs text-white/45">ID: {order.id}</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${order.color}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 rounded-2xl bg-[#00FFD1]/20 text-[#00FFD1] font-bold border border-[#00FFD1]/30 flex items-center justify-center gap-2">
        <Truck className="w-5 h-5" /> Request Priority Dispatch
      </button>
    </div>
  )
}
