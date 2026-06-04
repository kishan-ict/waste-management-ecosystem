'use client'

import { Filter, Calendar, FileText } from 'lucide-react'

const TRANSACTIONS = [
  { id: 'TXN-902', date: 'Today, 2:30 PM', mat: 'PET Plastics', qty: '120 KG', val: '₹1,200', to: 'EcoRecycle Ltd', status: 'verified', hash: '0x8f2a...9b1c' },
  { id: 'TXN-901', date: 'Yesterday',      mat: 'Cardboard',    qty: '350 KG', val: '₹2,100', to: 'GreenMill Ind',  status: 'verified', hash: '0x3c1b...7a4f' },
  { id: 'TXN-900', date: 'Oct 15, 2023',   mat: 'Mixed Metal',  qty: '85 KG',  val: '₹3,400', to: 'MetalCorp',      status: 'pending',  hash: 'Pending...' },
  { id: 'TXN-899', date: 'Oct 12, 2023',   mat: 'Glass Bottles',qty: '200 KG', val: '₹800',   to: 'EcoRecycle Ltd', status: 'verified', hash: '0x9a8b...1c2d' },
]

export default function MobileKabadiwalaHistory() {
  return (
    <div className="space-y-4">
      {/* iOS Header */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">History</h2>
        <button className="w-10 h-10 rounded-full bg-gp-800/40 border border-gp-700/30 flex items-center justify-center text-white/70 active:scale-95 transition-transform">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Swipeable List */}
      <div className="space-y-3 pb-8 mt-6">
        {TRANSACTIONS.map((txn) => (
          <div
            key={txn.id}
            className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 active:bg-gp-800/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-bold text-white">{txn.mat}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/50 mt-1">
                  <Calendar className="w-3 h-3" /> {txn.date}
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-neon-lime">{txn.val}</div>
                <div className="text-[11px] font-semibold text-white/50">{txn.qty}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gp-700/30 flex items-center justify-between">
              <div className="text-[11px] text-white/40 font-mono flex items-center gap-1.5">
                <FileText className="w-3 h-3" />
                {txn.hash}
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                txn.status === 'verified' ? 'bg-neon-lime/10 text-neon-lime' : 'bg-neon-amber/10 text-neon-amber'
              }`}>
                {txn.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
