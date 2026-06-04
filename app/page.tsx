'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Recycle, Shield, Brain, BarChart3, Zap, Globe, ChevronRight,
  Users, Package, TrendingUp, Star, ArrowRight, CheckCircle,
  Leaf, Database, Lock, Menu, X, Play, Award, Factory
} from 'lucide-react'

/* ─────── Particle Background ─────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(57,255,20,${p.alpha})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(84,106,47,${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    const handleResize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />
}

/* ─────── Navbar ─────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 bg-gp-gradient rounded-xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/logo_icon.png" alt="GREENPACK Logo" className="w-7 h-7 object-contain" />
            </div>
            <div className="absolute inset-0 rounded-xl animate-glow-pulse opacity-50" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="gradient-text">GREEN</span>
            <span className="text-white/80">PACK</span>
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Platform', 'Features', 'AI Engine', 'Trust System', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-white/60 hover:text-neon-lime transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/auth/register" className="btn-primary text-sm">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu */}
        <button className="md:hidden text-white/60" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-gp-700/30 mt-3"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {['Platform', 'Features', 'AI Engine', 'Trust System'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-neon-lime text-sm">
                  {item}
                </a>
              ))}
              <Link href="/auth/register" className="btn-primary text-center justify-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ─────── Hero Section ─────── */
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const [counter, setCounter] = useState({ pickers: 0, waste: 0, recyclers: 0 })
  useEffect(() => {
    const targets = { pickers: 12847, waste: 4.2, recyclers: 389 }
    const duration = 2000
    const steps = 60
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounter({
        pickers:  Math.round(targets.pickers * ease),
        waste:    parseFloat((targets.waste * ease).toFixed(1)),
        recyclers: Math.round(targets.recyclers * ease),
      })
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gp-dark" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <ParticleField />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gp-600/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-green/3 rounded-full blur-3xl" />

      {/* Scan Line */}
      <div className="scan-overlay" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-neon-lime mb-8 neon-border"
        >
          <span className="glow-dot" />
          <span className="font-mono">AI-POWERED WASTE INTELLIGENCE · INDIA</span>
          <span className="badge-trusted">BETA</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-6"
        >
          <span className="text-white">The Future of</span>
          <br />
          <span className="gradient-text">Waste Intelligence</span>
          <br />
          <span className="text-white/70 text-4xl md:text-5xl lg:text-6xl">for India</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/50 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          GREENPACK is an AI-powered trust and intelligence infrastructure connecting{' '}
          <span className="text-neon-lime font-semibold">Waste Pickers</span>,{' '}
          <span className="text-neon-amber font-semibold">Kabadiwalas</span>, and{' '}
          <span className="text-white/80 font-semibold">Recycling Industries</span>{' '}
          — building India's first verifiable circular economy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/auth/register" className="btn-primary text-base px-8 py-3.5">
            <Zap className="w-5 h-5" />
            Launch Platform
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="btn-neon text-base px-8 py-3.5 flex items-center gap-2 justify-center">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: 'Registered Pickers', value: counter.pickers.toLocaleString(), unit: '', icon: Users },
            { label: 'Waste Tracked', value: counter.waste.toFixed(1), unit: 'M KG', icon: Package },
            { label: 'Industry Partners', value: counter.recyclers.toString(), unit: '+', icon: Factory },
          ].map(({ label, value, unit, icon: Icon }) => (
            <div key={label} className="glass stat-card rounded-2xl p-4 text-center">
              <Icon className="w-5 h-5 text-neon-lime mx-auto mb-2 opacity-70" />
              <div className="font-display font-bold text-2xl md:text-3xl gradient-text">
                {value}<span className="text-base text-neon-lime">{unit}</span>
              </div>
              <div className="text-xs text-white/40 mt-1 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-neon-lime/40 to-transparent animate-pulse" />
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────── Feature Cards ─────── */
const FEATURES = [
  {
    icon: Brain,
    color: '#39FF14',
    title: 'AI Supply Prediction',
    desc: 'Machine learning models forecast recyclable material availability by zone, season, and category with 87%+ accuracy.',
    tag: 'AI ENGINE',
  },
  {
    icon: Shield,
    color: '#FFB800',
    title: 'Trust Score System',
    desc: 'Dynamic reputation scores for every kabadiwala and waste picker based on consistency, quality, and verified transactions.',
    tag: 'TRUST',
  },
  {
    icon: Database,
    color: '#00FFD1',
    title: 'Blockchain Verification',
    desc: 'Every transaction is anchored on Polygon blockchain — creating tamper-proof recycling certificates and audit trails.',
    tag: 'BLOCKCHAIN',
  },
  {
    icon: BarChart3,
    color: '#B5FF5A',
    title: 'Waste Analytics',
    desc: 'Real-time dashboards showing waste flows, material trends, and supply heatmaps across India\'s urban zones.',
    tag: 'ANALYTICS',
  },
  {
    icon: Users,
    color: '#FF6B6B',
    title: 'Digital Picker Identity',
    desc: 'Kabadiwalas register waste pickers digitally. Pickers get GREENPACK IDs, trust scores, and collection histories — without needing smartphones.',
    tag: 'IDENTITY',
  },
  {
    icon: Globe,
    color: '#A78BFA',
    title: 'Industry Matching',
    desc: 'Recycling industries discover verified, quality-graded material sources and connect with trusted kabadiwalas directly.',
    tag: 'MARKETPLACE',
  },
]

function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-neon-lime mb-6 font-mono">
            <Zap className="w-3 h-3" /> PLATFORM CAPABILITIES
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Not a recycling app. <br />
            <span className="gradient-text">An intelligence infrastructure.</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Six integrated systems working together to create India's most advanced waste intelligence platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="gp-card p-6 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${feat.color}18`, border: `1px solid ${feat.color}30` }}
              >
                <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
              </div>
              <div className="text-xs font-mono font-semibold mb-3" style={{ color: feat.color }}>
                {feat.tag}
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-3">{feat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────── Ecosystem Flow ─────── */
function EcosystemSection() {
  const nodes = [
    { id: 1, role: 'Waste Picker', icon: Recycle, color: '#39FF14', desc: 'Collects & segregates waste. Registered by Kabadiwala.', side: 'left' },
    { id: 2, role: 'Kabadiwala', icon: Shield, color: '#FFB800', desc: 'Digital gateway. Logs waste, manages pickers, builds trust.', side: 'center' },
    { id: 3, role: 'Industry', icon: Factory, color: '#00FFD1', desc: 'Discovers verified material, buys & rates suppliers.', side: 'right' },
  ]

  return (
    <section id="platform" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-neon-amber mb-6 font-mono">
            <Globe className="w-3 h-3" /> ECOSYSTEM ARCHITECTURE
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Three actors. <span className="gradient-text">One intelligent network.</span>
          </h2>
        </motion.div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="gp-card p-8 text-center w-64 relative group"
                style={{ borderColor: `${node.color}30` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${node.color}15`, boxShadow: `0 0 20px ${node.color}20` }}
                >
                  <node.icon className="w-8 h-8" style={{ color: node.color }} />
                </div>
                <div
                  className="text-xs font-mono font-bold mb-2 tracking-widest"
                  style={{ color: node.color }}
                >
                  {node.role.toUpperCase()}
                </div>
                <p className="text-white/50 text-sm">{node.desc}</p>
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
                  style={{ background: node.color, boxShadow: `0 0 8px ${node.color}` }}
                />
              </motion.div>

              {/* Connector Arrow */}
              {i < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                  className="hidden md:flex items-center px-4"
                >
                  <div className="w-16 h-px bg-gradient-to-r from-neon-green/40 to-neon-amber/40" />
                  <ChevronRight className="w-4 h-4 text-white/30 -ml-2" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Central AI Hub indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-4 neon-border">
            <Brain className="w-6 h-6 text-neon-lime" />
            <span className="text-sm font-semibold text-white/80">
              AI Intelligence Layer processes all data in real-time
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────── Trust System Section ─────── */
function TrustSection() {
  const pickerFactors = ['Collection Frequency', 'Waste Quality', 'Contamination History', 'Consistency Score']
  const kabadiFactors = ['Industry Ratings', 'Delivery Consistency', 'Quality Accuracy', 'Transaction Reliability']

  return (
    <section id="trust-system" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-neon-amber mb-6 font-mono">
            <Shield className="w-3 h-3" /> TRUST INTELLIGENCE
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Reputation built on <span className="gradient-text-gold">verified data</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'Picker Trust Score', factors: pickerFactors, color: '#39FF14', score: 87 },
            { title: 'Kabadiwala Trust Score', factors: kabadiFactors, color: '#FFB800', score: 93 },
          ].map(({ title, factors, color, score }) => (
            <motion.div
              key={title}
              initial={{ x: title.includes('Picker') ? -40 : 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="gp-card p-8"
              style={{ borderColor: `${color}25` }}
            >
              {/* Score Ring */}
              <div className="flex items-center gap-6 mb-8">
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(${color} ${score * 3.6}deg, rgba(84,106,47,0.15) 0deg)`,
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-gp-950 flex items-center justify-center">
                    <span className="font-display font-bold text-lg" style={{ color }}>
                      {score}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold mb-1" style={{ color }}>
                    TRUST SCORE
                  </div>
                  <div className="font-display font-bold text-xl text-white">{title}</div>
                  <div className="badge-trusted mt-2">ENTERPRISE VERIFIED</div>
                </div>
              </div>

              {/* Factors */}
              <div className="space-y-3">
                {factors.map((factor, i) => (
                  <div key={factor} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    <span className="text-sm text-white/70">{factor}</span>
                    <div className="flex-1 gp-progress">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${75 + i * 5}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="gp-progress-bar"
                        style={{
                          background: `linear-gradient(90deg, ${color}60, ${color})`,
                          boxShadow: `0 0 8px ${color}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────── AI Engine Section ─────── */
function AISection() {
  const insights = [
    { icon: TrendingUp, color: '#39FF14', text: 'Plastic waste expected to increase +23% in Zone A next month' },
    { icon: Package, color: '#FFB800', text: 'Cardboard availability rising near commercial sectors — high demand predicted' },
    { icon: BarChart3, color: '#00FFD1', text: 'Metal scrap supply peak forecasted for Bengaluru South in 2 weeks' },
    { icon: Star, color: '#B5FF5A', text: 'Rajesh Kabadiwala (Mumbai West) ranked #1 trusted supplier this quarter' },
  ]

  return (
    <section id="ai-engine" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gp-950/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold text-neon-lime mb-6 font-mono">
              <Brain className="w-3 h-3" /> AI ENGINE
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
              Predictive intelligence<br />
              <span className="gradient-text">before it happens</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Our AI analyzes historical waste flows, seasonal patterns, and urban activity to predict recyclable material availability — days before it arrives.
            </p>
            <div className="space-y-3">
              {['Supply Prediction Engine', 'Waste Zone Heatmapping', 'Material Trend Forecasting', 'Trusted Supplier Ranking'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="glow-dot flex-shrink-0" />
                  <span className="text-white/70 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI Insights Feed */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-3">
              <div className="glow-dot" />
              <span className="text-xs font-mono text-neon-lime">GREENPACK AI · LIVE INSIGHTS</span>
              <div className="ml-auto text-xs text-white/30 font-mono">04:32:17</div>
            </div>
            {insights.map(({ icon: Icon, color, text }, i) => (
              <motion.div
                key={text}
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="gp-card p-4 flex items-start gap-4"
                style={{ borderLeft: `3px solid ${color}50` }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─────── Roles CTA ─────── */
function RolesCTA() {
  const roles = [
    {
      icon: Users,
      title: 'Kabadiwala',
      color: '#FFB800',
      desc: 'Register pickers, log waste, build your digital reputation.',
      href: '/auth/register?role=kabadiwala',
      features: ['Picker Management', 'Waste Logging', 'Trust Score', 'Inventory Tracking'],
    },
    {
      icon: Factory,
      title: 'Industry',
      color: '#00FFD1',
      desc: 'Discover verified recyclables, connect with trusted suppliers.',
      href: '/auth/register?role=industry',
      features: ['Material Search', 'Supplier Discovery', 'Quality Analytics', 'Purchase Requests'],
    },
    {
      icon: Lock,
      title: 'Admin',
      color: '#B5FF5A',
      desc: 'Monitor ecosystem health, prevent fraud, drive insights.',
      href: '/auth/login?role=admin',
      features: ['Ecosystem Analytics', 'Fraud Detection', 'User Management', 'System Health'],
    },
  ]

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Your role in the <span className="gradient-text">ecosystem</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="gp-card p-8 group hover:scale-[1.02] transition-transform"
              style={{ borderTop: `2px solid ${role.color}40` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${role.color}15`, boxShadow: `0 0 20px ${role.color}15` }}
              >
                <role.icon className="w-7 h-7" style={{ color: role.color }} />
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">{role.title}</h3>
              <p className="text-white/50 text-sm mb-6">{role.desc}</p>
              <ul className="space-y-2 mb-8">
                {role.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle className="w-3.5 h-3.5" style={{ color: role.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={role.href}
                className="block text-center py-3 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: `${role.color}18`,
                  color: role.color,
                  border: `1px solid ${role.color}30`,
                }}
              >
                Get Started →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────── Footer ─────── */
function Footer() {
  return (
    <footer className="border-t border-gp-800/30 py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gp-gradient rounded-lg flex items-center justify-center">
                <img src="/logo_icon.png" alt="GREENPACK Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-display font-bold gradient-text">GREENPACK</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              AI-powered waste intelligence infrastructure for India's informal recycling ecosystem.
            </p>
          </div>
          {[
            { title: 'Platform', links: ['Kabadiwala', 'Industry', 'Admin', 'AI Engine'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-neon-lime transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-divider" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-white/30 text-sm font-mono">
            © 2025 GREENPACK. Built for India's circular economy.
          </p>
          <div className="flex items-center gap-2 text-white/30 text-sm font-mono">
            <Leaf className="w-3.5 h-3.5 text-neon-lime" />
            Carbon Neutral · Polygon Verified
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────── Page ─────── */
export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <EcosystemSection />
      <TrustSection />
      <AISection />
      <RolesCTA />
      <Footer />
    </main>
  )
}
