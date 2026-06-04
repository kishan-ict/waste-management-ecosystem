'use client'

import { motion } from 'framer-motion'
import { FileCheck, Download, QrCode } from 'lucide-react'

const CERTS = [
  { id: 'CERT-902A', mat: 'PET Plastic',  qty: '12 Tons', date: 'Oct 20, 2023', hash: '0x8f2a...9b1c', valid: true },
  { id: 'CERT-801B', mat: 'Aluminium',    qty: '5 Tons',  date: 'Sep 15, 2023', hash: '0x3c1b...7a4f', valid: true },
]

export default function MobileIndustryCerts() {
  return (
    <div className="space-y-6 pb-8">
      {/* iOS Header */}
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">Green Certs</h2>
        <div className="px-3 py-1 rounded-full bg-gp-800/40 border border-gp-700/30 text-white/70 text-xs font-bold flex items-center gap-1.5">
          <FileCheck className="w-3 h-3" /> {CERTS.length}
        </div>
      </div>

      {/* Apple Wallet Style Cards Stack */}
      <div className="relative h-[450px]">
        {CERTS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: i * 40, opacity: 1 }}
            className={`absolute top-0 left-0 right-0 rounded-[28px] overflow-hidden shadow-2xl ${
              i === 0 ? 'bg-gradient-to-br from-[#00FFD1]/20 to-gp-900 border border-[#00FFD1]/30 z-20' : 
              'bg-gradient-to-br from-neon-lime/20 to-gp-900 border border-neon-lime/30 z-10'
            }`}
            style={{ height: '380px' }}
          >
            {/* Ticket Header */}
            <div className="p-6 pb-4 border-b border-white/10 flex justify-between items-start">
              <div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Blockchain Certificate</div>
                <div className="text-xl font-bold text-white">{cert.mat}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Ticket Body */}
            <div className="p-6 space-y-5">
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-white/40 mb-1 uppercase tracking-wider font-semibold">Volume</div>
                  <div className="text-lg font-bold text-white">{cert.qty}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 mb-1 uppercase tracking-wider font-semibold">Issue Date</div>
                  <div className="text-lg font-bold text-white">{cert.date}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-1 uppercase tracking-wider font-semibold">Txn Hash</div>
                <div className="text-sm font-mono text-[#00FFD1] bg-[#00FFD1]/10 px-3 py-1.5 rounded-lg inline-block border border-[#00FFD1]/20">
                  {cert.hash}
                </div>
              </div>
            </div>

            {/* Ticket Footer / QR */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/20 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-white/70" />
                <span className="text-xs text-white/40 font-mono">Scan to verify</span>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-transform">
                <Download className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
