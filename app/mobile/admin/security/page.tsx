'use client'

import { Shield, Key, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

const LOGS = [
  { time: '14:52:12', event: 'Root auth token refreshed', type: 'info', details: 'IP: 103.45.28.12 • Session duration 2h', icon: Key, color: 'text-blue-400 bg-blue-500/10' },
  { time: '14:49:05', event: 'Failed login attempt blocked', type: 'warning', details: 'User: temp_admin • IP: 198.51.100.4 (VPN block)', icon: AlertCircle, color: 'text-red-400 bg-red-500/10' },
  { time: '14:42:50', event: 'Smart contract verified', type: 'success', details: 'Contract: 0x9f7a...3b21 • Gas used: 42,104', icon: CheckCircle2, color: 'text-neon-lime bg-neon-lime/10' },
  { time: '14:38:11', event: 'System integrity scan complete', type: 'success', details: '0 vulnerabilities found • SHA-256 verified', icon: CheckCircle2, color: 'text-neon-lime bg-neon-lime/10' },
]

export default function MobileAdminSecurity() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
          <Shield className="w-7 h-7 text-red-400" /> Security Logs
        </h2>
        <button className="w-9 h-9 rounded-full bg-gp-800/50 flex items-center justify-center text-white/50 hover:text-white transition-colors active:rotate-180 duration-500">
          <RefreshCw className="w-4 h-4 pointer-events-none" />
        </button>
      </div>

      <div className="space-y-3">
        {LOGS.map((log, i) => (
          <div key={i} className="p-4 rounded-3xl bg-gp-800/30 border border-gp-700/20 flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${log.color}`}>
              <log.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">{log.event}</span>
                <span className="text-[10px] text-white/40">{log.time}</span>
              </div>
              <p className="text-xs text-white/55">{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
