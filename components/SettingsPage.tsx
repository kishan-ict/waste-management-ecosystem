'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User, Bell, Shield, Globe, Palette, Save, CheckCircle, Key, Smartphone } from 'lucide-react'

export default function SettingsPage({ role = 'kabadiwala' }: { role?: string }) {
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState({
    industryRequests: true, aiInsights: true, trustUpdates: true,
    weeklyReport: false, smsAlerts: true, emailAlerts: true,
  })
  const [lang, setLang] = useState('en')
  const [form, setForm] = useState({
    name: role === 'kabadiwala' ? 'Rajesh Kumar' : role === 'industry' ? 'EcoRecycle Ltd' : 'Super Admin',
    email: `${role}@greenpack.in`,
    phone: '+91 98765 43210',
    city: role === 'kabadiwala' ? 'Mumbai' : 'Bengaluru',
    bio: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const TABS = [
    { id: 'profile',       icon: User,        label: 'Profile'       },
    { id: 'notifications', icon: Bell,        label: 'Notifications' },
    { id: 'security',      icon: Shield,      label: 'Security'      },
    { id: 'language',      icon: Globe,       label: 'Language'      },
    { id: 'appearance',    icon: Palette,     label: 'Appearance'    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <Settings className="w-6 h-6 text-neon-lime" />
            Account Settings
          </h1>
          <p className="text-white/40 text-sm mt-1">Manage your account preferences</p>
        </div>
        {saved && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 glass rounded-xl px-4 py-2 border border-neon-lime/20">
            <CheckCircle className="w-4 h-4 text-neon-lime" />
            <span className="text-sm text-neon-lime">Changes saved!</span>
          </motion.div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-44 flex-shrink-0">
          <div className="gp-card p-2 space-y-1">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-gp-700/40 text-neon-lime border border-gp-600/30'
                    : 'text-white/50 hover:text-white/80 hover:bg-gp-800/40'
                }`}>
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 gp-card p-6">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-white text-lg">Profile Information</h2>
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gp-gradient flex items-center justify-center text-2xl font-bold text-neon-lime">
                  {form.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <button className="text-sm text-neon-lime hover:underline">Change photo</button>
                  <p className="text-xs text-white/30 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Full Name</label>
                  <input className="gp-input" value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Email</label>
                  <input type="email" className="gp-input" value={form.email} onChange={set('email')} />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Phone</label>
                  <input className="gp-input" value={form.phone} onChange={set('phone')} />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">City</label>
                  <input className="gp-input" value={form.city} onChange={set('city')} />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Bio / Description</label>
                <textarea className="gp-input resize-none" rows={3} placeholder="Tell us about your operation..."
                  value={form.bio} onChange={set('bio')} />
              </div>
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-white text-lg">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'industryRequests', label: 'Industry purchase requests',   desc: 'When a company requests your material'      },
                  { key: 'aiInsights',       label: 'AI supply insights',           desc: 'Weekly AI-generated market predictions'     },
                  { key: 'trustUpdates',     label: 'Trust score changes',          desc: 'When your trust score is updated'           },
                  { key: 'weeklyReport',     label: 'Weekly analytics report',      desc: 'Summary of your weekly performance'         },
                  { key: 'smsAlerts',        label: 'SMS alerts',                   desc: 'Critical alerts via SMS to your phone'      },
                  { key: 'emailAlerts',      label: 'Email notifications',          desc: 'Receive all updates via email'              },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-gp-900/50">
                    <div>
                      <div className="text-sm font-medium text-white">{label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
                      style={{ background: notifications[key as keyof typeof notifications] ? '#39FF14' : 'rgba(84,106,47,0.3)' }}>
                      <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                        style={{ left: notifications[key as keyof typeof notifications] ? '22px' : '2px' }} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="btn-primary"><Save className="w-4 h-4" /> Save Preferences</button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-white text-lg">Security Settings</h2>
              <div className="p-4 rounded-xl bg-gp-900/50 border border-gp-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-5 h-5 text-neon-lime" />
                  <div>
                    <div className="text-sm font-semibold text-white">Change Password</div>
                    <div className="text-xs text-white/40">Last changed 30 days ago</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <input type="password" className="gp-input" placeholder="Current password" />
                  <input type="password" className="gp-input" placeholder="New password" />
                  <input type="password" className="gp-input" placeholder="Confirm new password" />
                  <button onClick={handleSave} className="btn-primary text-sm">Update Password</button>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gp-900/50 border border-gp-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-neon-amber" />
                    <div>
                      <div className="text-sm font-semibold text-white">Two-Factor Authentication</div>
                      <div className="text-xs text-white/40">Add an extra layer of security</div>
                    </div>
                  </div>
                  <button className="text-xs px-4 py-2 rounded-lg border border-neon-amber/30 text-neon-amber hover:bg-neon-amber/10 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-white text-lg">Language & Region</h2>
              <div className="space-y-3">
                {[
                  { code: 'en', name: 'English',         flag: '🇬🇧', available: true  },
                  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)',  flag: '🇮🇳', available: false },
                  { code: 'te', name: 'తెలుగు (Telugu)',   flag: '🇮🇳', available: false },
                  { code: 'hi', name: 'हिंदी (Hindi)',     flag: '🇮🇳', available: false },
                ].map(l => (
                  <button key={l.code}
                    onClick={() => l.available && setLang(l.code)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border transition-all"
                    style={{
                      background: lang === l.code ? 'rgba(57,255,20,0.08)' : 'rgba(84,106,47,0.06)',
                      borderColor: lang === l.code ? 'rgba(57,255,20,0.3)' : 'rgba(84,106,47,0.2)',
                      opacity: l.available ? 1 : 0.5,
                    }}>
                    <span className="text-2xl">{l.flag}</span>
                    <span className="text-sm font-medium text-white">{l.name}</span>
                    {!l.available && <span className="ml-auto text-xs text-white/30">Coming soon</span>}
                    {lang === l.code && <CheckCircle className="ml-auto w-4 h-4 text-neon-lime" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-white text-lg">Appearance</h2>
              <div className="p-4 rounded-xl bg-gp-900/50">
                <p className="text-sm text-white/50 mb-4">Theme</p>
                <div className="flex gap-3">
                  {[
                    { id: 'dark',  label: 'Dark Mode',    bg: '#0A0F06', active: true  },
                    { id: 'light', label: 'Light (Soon)',  bg: '#f5f5f0', active: false },
                  ].map(t => (
                    <div key={t.id}
                      className="flex-1 rounded-xl border p-4 cursor-pointer"
                      style={{
                        background: t.bg,
                        borderColor: t.active ? 'rgba(57,255,20,0.4)' : 'rgba(84,106,47,0.2)',
                        opacity: t.active ? 1 : 0.4,
                      }}>
                      <div className="text-xs font-medium" style={{ color: t.active ? '#39FF14' : '#546A2F' }}>
                        {t.label} {t.active && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-gp-900/50">
                <p className="text-sm text-white/50 mb-3">Accent Colour</p>
                <div className="flex gap-3">
                  {['#39FF14','#FFB800','#00FFD1','#B5FF5A','#A78BFA'].map(c => (
                    <button key={c} className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                      style={{ background: c, borderColor: c === '#39FF14' ? 'white' : 'transparent' }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
