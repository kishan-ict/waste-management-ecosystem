'use client'

import { Network, Database, Layers, CheckCircle2, ChevronRight } from 'lucide-react'

const BLOCKS = [
  { height: '#28,490', txns: 12, hash: '0x8a92...b412', validators: 32, timestamp: '12s ago' },
  { height: '#28,489', txns: 8, hash: '0x7c1a...710d', validators: 32, timestamp: '1m ago' },
  { height: '#28,488', txns: 15, hash: '0x1e8f...92da', validators: 32, timestamp: '3m ago' },
  { height: '#28,487', txns: 5, hash: '0x321e...88ab', validators: 32, timestamp: '5m ago' },
]

export default function MobileAdminBlockchain() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Network className="w-7 h-7 text-purple-400" /> Blockchain Ledger
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Layers className="w-6 h-6 text-purple-400 mb-2" />
          <div className="text-xl font-bold text-white">28,490</div>
          <div className="text-xs text-white/50">Current Block Height</div>
        </div>
        <div className="p-4 rounded-3xl bg-gp-800/40 border border-gp-700/30">
          <Database className="w-6 h-6 text-blue-400 mb-2" />
          <div className="text-xl font-bold text-white">99.9%</div>
          <div className="text-xs text-white/50">Consensus Health</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider ml-2">Recent Blocks</h3>
        {BLOCKS.map((block, i) => (
          <div key={i} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Block {block.height}</div>
                <div className="text-xs text-white/45">{block.txns} transactions • {block.hash}</div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] text-neon-lime font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sync
              </span>
              <span className="text-[10px] text-white/30 mt-1">{block.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
