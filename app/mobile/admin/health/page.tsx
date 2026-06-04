'use client'

import { Server, Activity, Cpu, Database, AlertCircle } from 'lucide-react'

const NODES = [
  { name: 'Primary REST API', status: 'Healthy', load: '42%', mem: '64%', color: 'text-neon-lime bg-neon-lime/10 border-neon-lime/20' },
  { name: 'Neural Inference Hub', status: 'Warning', load: '88%', mem: '92%', color: 'text-neon-amber bg-neon-amber/10 border-neon-amber/20' },
  { name: 'Blockchain Ledger Node', status: 'Healthy', load: '34%', mem: '51%', color: 'text-neon-lime bg-neon-lime/10 border-neon-lime/20' },
  { name: 'IPFS Storage Gateway', status: 'Healthy', load: '12%', mem: '28%', color: 'text-neon-lime bg-neon-lime/10 border-neon-lime/20' },
]

export default function MobileAdminHealth() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Server className="w-7 h-7 text-[#B5FF5A]" /> Node Health
        </h2>
        <div className="flex items-center gap-1 bg-neon-lime/10 border border-neon-lime/20 text-neon-lime text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          <Activity className="w-3 h-3 animate-pulse" /> All Systems Go
        </div>
      </div>

      <div className="space-y-4">
        {NODES.map((node, i) => (
          <div key={i} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> {node.name}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${node.color}`}>
                {node.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="flex items-center gap-2 bg-gp-800/20 p-2.5 rounded-2xl">
                <Cpu className="w-4 h-4 text-white/40" />
                <div>
                  <div className="text-[10px] text-white/40">CPU Load</div>
                  <div className="text-xs font-bold text-white">{node.load}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gp-800/20 p-2.5 rounded-2xl">
                <Database className="w-4 h-4 text-white/40" />
                <div>
                  <div className="text-[10px] text-white/40">Memory</div>
                  <div className="text-xs font-bold text-white">{node.mem}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
