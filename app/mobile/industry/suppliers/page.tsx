'use client'

import { Users, Search, MoreVertical, Plus, Star } from 'lucide-react'

const SUPPLIERS = [
  { id: 1, name: 'Rajesh Kumar', zone: 'Mumbai South', trustScore: 94, category: 'PET Plastics', active: true },
  { id: 2, name: 'EcoCollect India', zone: 'Bandra West', trustScore: 98, category: 'All Materials', active: true },
  { id: 3, name: 'Swachh Scrap Traders', zone: 'Andheri East', trustScore: 89, category: 'Cardboard & Paper', active: false },
]

export default function MobileSuppliers() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Suppliers Directory</h2>
        <button className="w-10 h-10 rounded-full bg-[#00FFD1]/20 text-[#00FFD1] flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input type="text" placeholder="Search suppliers..." className="w-full bg-gp-800/50 border border-gp-700/30 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#00FFD1]/50" />
      </div>

      <div className="space-y-3 mt-6">
        {SUPPLIERS.map((supplier) => (
          <div key={supplier.id} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#00FFD1]/10 flex items-center justify-center border border-[#00FFD1]/30">
                  <Users className="w-5 h-5 text-[#00FFD1]" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gp-900 ${supplier.active ? 'bg-neon-lime' : 'bg-red-500'}`} />
              </div>
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  {supplier.name}
                </div>
                <div className="text-xs text-white/50">{supplier.zone} • {supplier.category}</div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs font-bold text-neon-amber bg-neon-amber/10 py-1 px-2.5 rounded-full mb-1">
                <Star className="w-3 h-3 fill-neon-amber" /> {supplier.trustScore}
              </div>
              <MoreVertical className="w-4 h-4 text-white/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
