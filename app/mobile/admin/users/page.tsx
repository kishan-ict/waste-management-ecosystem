'use client'

import { useState } from 'react'
import { Search, User, Shield, Package, MapPin, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'

const USERS = [
  { id: '1', name: 'Rajesh Kumar', role: 'Kabadiwala', loc: 'Mumbai', score: 94, status: 'active' },
  { id: '2', name: 'EcoRecycle Ltd', role: 'Industry', loc: 'Pune', score: 99, status: 'active' },
  { id: '3', name: 'Amit Singh', role: 'Picker', loc: 'Mumbai', score: 72, status: 'flagged' },
]

export default function MobileAdminUsers() {
  const [query, setQuery] = useState('')

  return (
    <div className="space-y-4 pb-8">
      {/* iOS Header */}
      <div className="flex flex-col pb-2 space-y-4">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">User Directory</h2>
        
        {/* iOS Native Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search users, roles, locations..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-gp-800/50 border border-gp-700/30 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B5FF5A]/50 focus:bg-gp-800 transition-colors"
          />
        </div>
      </div>

      {/* User List */}
      <div className="space-y-3">
        {USERS.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-center justify-between active:bg-gp-800/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  user.role === 'Kabadiwala' ? 'bg-neon-lime/10 border-neon-lime text-neon-lime' :
                  user.role === 'Industry' ? 'bg-[#00FFD1]/10 border-[#00FFD1] text-[#00FFD1]' :
                  'bg-white/10 border-white/20 text-white'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gp-900 ${
                  user.status === 'active' ? 'bg-neon-lime' : 'bg-red-500'
                }`} />
              </div>
              
              <div>
                <div className="text-base font-bold text-white leading-tight">{user.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/50">{user.role}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-xs text-white/50 flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {user.loc}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                user.score > 90 ? 'bg-neon-lime/20 text-neon-lime' : 
                user.score > 80 ? 'bg-neon-amber/20 text-neon-amber' : 'bg-red-500/20 text-red-400'
              }`}>
                Score {user.score}
              </div>
              <button className="p-1 rounded-full text-white/30 hover:text-white active:bg-white/10">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
