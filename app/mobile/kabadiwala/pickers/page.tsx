'use client'

import { Users, Search, MoreVertical, Plus } from 'lucide-react'

const PICKERS = [
  { id: 1, name: 'Suresh V.', zone: 'Mumbai South', collected: '450 KG', active: true },
  { id: 2, name: 'Ramesh K.', zone: 'Bandra West', collected: '230 KG', active: true },
  { id: 3, name: 'Amit T.', zone: 'Andheri', collected: '80 KG', active: false },
]

export default function MobilePickers() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Manage Pickers</h2>
        <button className="w-10 h-10 rounded-full bg-neon-cyan/20 text-neon-cyan flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input type="text" placeholder="Search pickers..." className="w-full bg-gp-800/50 border border-gp-700/30 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-neon-cyan/50" />
      </div>

      <div className="space-y-3 mt-6">
        {PICKERS.map((picker) => (
          <div key={picker.id} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30">
                  <Users className="w-5 h-5 text-neon-cyan" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gp-900 ${picker.active ? 'bg-neon-lime' : 'bg-red-500'}`} />
              </div>
              <div>
                <div className="font-bold text-white">{picker.name}</div>
                <div className="text-xs text-white/50">{picker.zone}</div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="text-sm font-bold text-white mb-1">{picker.collected}</div>
              <MoreVertical className="w-4 h-4 text-white/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
