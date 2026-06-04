'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Recycle, LayoutDashboard, Users, Package, BarChart3, Star,
  Truck, History, Settings, LogOut, Bell, ChevronDown, Menu,
  X, CheckCircle, AlertTriangle, Brain, Clock
} from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { href: '/dashboard/kabadiwala',            icon: LayoutDashboard, label: 'Overview'          },
  { href: '/dashboard/kabadiwala/pickers',    icon: Users,           label: 'Manage Pickers'    },
  { href: '/dashboard/kabadiwala/log-waste',  icon: Package,         label: 'Log Waste'         },
  { href: '/dashboard/kabadiwala/inventory',  icon: Truck,           label: 'Inventory'         },
  { href: '/dashboard/kabadiwala/analytics',  icon: BarChart3,       label: 'Analytics'         },
  { href: '/dashboard/kabadiwala/trust',      icon: Star,            label: 'Trust Score'       },
  { href: '/dashboard/kabadiwala/history',    icon: History,         label: 'Transaction History'},
]

const NOTIFICATIONS = [
  { id: 1, icon: Brain,         color: '#39FF14', title: 'AI Insight',          body: 'Plastic collection expected to peak Friday (+18%)',  time: '5m ago',  read: false },
  { id: 2, icon: CheckCircle,   color: '#00FFD1', title: 'Transaction Confirmed', body: 'TXN-001 with EcoRecycle Ltd — ₹4,320 confirmed',    time: '1h ago',  read: false },
  { id: 3, icon: AlertTriangle, color: '#FFB800', title: 'Trust Score Update',  body: 'Your trust score increased by +2 to 94',             time: '3h ago',  read: true  },
]

export default function KabadiLayout({ children }: { children: React.ReactNode }) {
  const pathname                  = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotifs, setShowNotifs]   = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifs, setNotifs]           = useState(NOTIFICATIONS)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setSidebarOpen(true)
      else setSidebarOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const unreadCount = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })))

  return (
    <div className="flex h-screen bg-gp-dark overflow-hidden relative">
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: isMobile ? 280 : (sidebarOpen ? 240 : 64) }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`sidebar flex-shrink-0 flex flex-col overflow-hidden fixed md:relative z-50 h-full ${
          isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        } transition-transform duration-300 md:transition-none`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-gp-800/40 h-16">
          <div className="w-8 h-8 bg-gp-gradient rounded-lg flex items-center justify-center flex-shrink-0">
            <img src="/logo_icon.png" alt="GREENPACK Logo" className="w-6 h-6 object-contain" />
          </div>
          {(!isMobile ? sidebarOpen : true) && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-display font-bold text-base gradient-text whitespace-nowrap">
              GREENPACK
            </motion.span>
          )}
        </div>

        {(!isMobile ? sidebarOpen : true) && (
          <div className="px-4 py-3">
            <div className="glass rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="glow-dot-amber flex-shrink-0" />
              <span className="text-xs font-mono font-semibold text-neon-amber">KABADIWALA</span>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className={`sidebar-item ${pathname === href ? 'active' : ''}`}
              title={!sidebarOpen ? label : undefined}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              {(!isMobile ? sidebarOpen : true) && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-gp-800/30 space-y-1">
          <Link href="/dashboard/kabadiwala/settings"
            className={`sidebar-item ${pathname === '/dashboard/kabadiwala/settings' ? 'active' : ''}`}
            title={!sidebarOpen ? 'Settings' : undefined}>
            <Settings className="w-4 h-4 flex-shrink-0" />
            {(!isMobile ? sidebarOpen : true) && <span>Settings</span>}
          </Link>
          <Link href="/auth/login" className="sidebar-item text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
            title={!sidebarOpen ? 'Sign Out' : undefined}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(!isMobile ? sidebarOpen : true) && <span>Sign Out</span>}
          </Link>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gp-800/30 flex items-center justify-between px-6 bg-gp-950/80 backdrop-blur-sm relative z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/40 hover:text-white/80">
              <Menu className="w-5 h-5" />
            </button>
            <div className="truncate">
              <h1 className="text-sm font-semibold text-white truncate">Kabadiwala Dashboard</h1>
              <p className="text-xs text-white/30 font-mono hidden sm:block truncate">Rajesh Kumar · Mumbai West Zone</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifs(v => !v); setShowProfile(false) }}
                className="relative text-white/40 hover:text-white/80 transition-colors">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-lime text-gp-950 text-xs flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 gp-card overflow-hidden"
                    style={{ zIndex: 50 }}>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gp-700/30">
                      <span className="text-sm font-semibold text-white">Notifications</span>
                      <div className="flex items-center gap-3">
                        <button onClick={markAllRead} className="text-xs text-neon-lime hover:underline">Mark all read</button>
                        <button onClick={() => setShowNotifs(false)} className="text-white/40 hover:text-white/80">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-gp-700/20">
                      {notifs.map(n => (
                        <div key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gp-800/30 ${!n.read ? 'bg-gp-800/20' : ''}`}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${n.color}18` }}>
                            <n.icon className="w-4 h-4" style={{ color: n.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-white">{n.title}</span>
                              {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-neon-lime flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{n.body}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-white/20" />
                              <span className="text-xs text-white/30">{n.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-gp-700/30">
                      <button className="text-xs text-neon-lime hover:underline w-full text-center">View all notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setShowProfile(v => !v); setShowNotifs(false) }}
                className="flex items-center gap-2 glass rounded-lg px-3 py-1.5 hover:bg-gp-700/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gp-gradient flex items-center justify-center text-xs font-bold text-neon-lime">RK</div>
                <span className="text-sm text-white/70 hidden sm:block">Rajesh K.</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 gp-card overflow-hidden"
                    style={{ zIndex: 50 }}>
                    <div className="px-4 py-3 border-b border-gp-700/30">
                      <div className="text-sm font-semibold text-white">Rajesh Kumar</div>
                      <div className="text-xs text-white/40">kabadiwala@greenpack.in</div>
                      <div className="text-xs text-neon-amber mt-1 font-semibold">Trust Score: 94 🏆</div>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link href="/dashboard/kabadiwala/trust" onClick={() => setShowProfile(false)}
                        className="sidebar-item text-sm !rounded-lg">
                        <Star className="w-4 h-4" /> Trust Score
                      </Link>
                      <Link href="/dashboard/kabadiwala/settings" onClick={() => setShowProfile(false)}
                        className="sidebar-item text-sm !rounded-lg">
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <Link href="/auth/login"
                        className="sidebar-item text-sm !rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
