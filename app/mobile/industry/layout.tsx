'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, CheckSquare, FileCheck, User, Search, Bell, Menu, X, Users, Truck, BarChart3, ShieldCheck, AlertCircle } from 'lucide-react'

const TABS = [
  { href: '/mobile/industry',        icon: LayoutDashboard, label: 'Home' },
  { href: '/mobile/industry/match',  icon: CheckSquare,     label: 'Match' },
  { href: '/mobile/industry/certs',  icon: FileCheck,       label: 'Certs' },
  { href: '/mobile/industry/profile',icon: User,            label: 'Profile' },
]

export default function MobileIndustryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-gp-dark overflow-hidden">
      
      {/* iOS Style Top Header */}
      <header className="px-5 pt-12 pb-3 bg-gp-950/80 backdrop-blur-xl border-b border-gp-800/30 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMenuOpen(true)} className="w-9 h-9 rounded-full bg-gp-800/50 flex items-center justify-center text-white/70 hover:bg-gp-800 transition-colors">
            <Menu className="w-5 h-5 pointer-events-none" />
          </button>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold tracking-wider uppercase mb-0.5" style={{ color: '#00FFD1' }}>Industry Portal</span>
            <h1 className="text-xl font-display font-bold text-white tracking-tight">EcoRecycle Ltd</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => showToast('Search coming soon!')} className="w-9 h-9 rounded-full bg-gp-800/50 flex items-center justify-center text-white/70 hover:bg-gp-800 transition-colors active:scale-95">
            <Search className="w-4 h-4 pointer-events-none" />
          </button>
          <button onClick={() => showToast('No new alerts')} className="w-9 h-9 rounded-full bg-gp-800/50 flex items-center justify-center text-white/70 hover:bg-gp-800 transition-colors relative active:scale-95">
            <Bell className="w-4 h-4 pointer-events-none" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00FFD1] rounded-full pointer-events-none" />
          </button>
        </div>
      </header>

      {/* Custom Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-gp-800 border border-gp-700/50 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-5 duration-300">
          <AlertCircle className="w-4 h-4 text-neon-amber pointer-events-none" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Slide-out Hamburger Menu (CSS Transition) */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 w-[280px] bg-gp-900 z-[70] shadow-2xl flex flex-col border-r border-gp-800/50 transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-5 pt-12 flex items-center justify-between border-b border-gp-800/30">
          <span className="font-display font-bold text-lg text-white">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="text-white/50 hover:text-white p-2">
            <X className="w-6 h-6 pointer-events-none" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
          <Link href="/mobile/industry/suppliers" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gp-800/50 active:bg-gp-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#00FFD1]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#00FFD1]" />
            </div>
            <span className="font-medium text-white">Suppliers Directory</span>
          </Link>
          <Link href="/mobile/industry/procurement" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gp-800/50 active:bg-gp-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-medium text-white">Procurement Orders</span>
          </Link>
          <Link href="/mobile/industry/analytics" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gp-800/50 active:bg-gp-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-medium text-white">ESG Analytics</span>
          </Link>
          <Link href="/mobile/industry/compliance" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gp-800/50 active:bg-gp-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-neon-amber/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-neon-amber" />
            </div>
            <span className="font-medium text-white">Compliance Audits</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar relative">
        <div className="p-5">
          {children}
        </div>
      </main>

      {/* iOS Style Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-[84px] bg-gp-950/90 backdrop-blur-xl border-t border-gp-800/40 pb-5 pt-2 px-6 flex justify-between items-center z-50">
        {TABS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center justify-center w-16 gap-1 relative">
              <div className={`relative flex items-center justify-center w-12 h-8 rounded-full transition-colors ${isActive ? 'bg-[#00FFD1]/10' : ''}`}>
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#00FFD1]' : 'text-white/40'}`} />
                {isActive && (
                  <motion.div layoutId="ind-tab-indicator" className="absolute -top-2 w-1 h-1 bg-[#00FFD1] rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#00FFD1]' : 'text-white/40'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
