'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Download, Eye, CheckCircle, Shield, QrCode, Calendar, Package } from 'lucide-react'

const CERTIFICATES = [
  {
    id: 'CERT-WE-001A3B', type: 'Recycling Certificate',  material: 'Plastic (PET)',   qty: 240, quality: 'A',
    issuer: 'GREENPACK Blockchain', date: '2024-06-03', expiry: '2025-06-03',
    kabadiwala: 'Rajesh Kumar',     hash: '0x3f2a8b1c9d4e7f2a3c1b',  valid: true,
  },
  {
    id: 'CERT-WE-002C4D', type: 'Collection Certificate', material: 'Scrap Metal',      qty: 95,  quality: 'A',
    issuer: 'GREENPACK Blockchain', date: '2024-06-01', expiry: '2025-06-01',
    kabadiwala: 'Sharma Traders',   hash: '0x7d1e4f9a2c8b5e3d6f4a',  valid: true,
  },
  {
    id: 'CERT-WE-003E5F', type: 'Recycling Certificate',  material: 'E-Waste',         qty: 32,  quality: 'A',
    issuer: 'GREENPACK Blockchain', date: '2024-05-30', expiry: '2025-05-30',
    kabadiwala: 'Patel Kabadiwala', hash: '0x2a8cd4e19f3b7c1e5d2a', valid: true,
  },
  {
    id: 'CERT-WE-004G6H', type: 'Recycling Certificate',  material: 'HDPE Plastic',    qty: 120, quality: 'B',
    issuer: 'GREENPACK Blockchain', date: '2024-05-28', expiry: '2025-05-28',
    kabadiwala: 'Ravi Waste Coll',  hash: '0x9f3d7a2b1c5e8d4f6a1b', valid: true,
  },
]

export default function CertificatesPage() {
  const [previewId, setPreviewId] = useState<string | null>(null)

  const previewed = CERTIFICATES.find(c => c.id === previewId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-white flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-neon-lime" />
            Recycling Certificates
          </h1>
          <p className="text-white/40 text-sm mt-1">Blockchain-verified certificates for all transactions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-lime">{CERTIFICATES.length}</div>
          <div className="text-xs text-white/40 mt-1">Total Certificates</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-neon-lime">{CERTIFICATES.filter(c => c.valid).length}</div>
          <div className="text-xs text-white/40 mt-1">Active / Valid</div>
        </div>
        <div className="gp-card stat-card p-5 text-center">
          <div className="font-display font-bold text-2xl text-white">
            {CERTIFICATES.reduce((a, c) => a + c.qty, 0)} KG
          </div>
          <div className="text-xs text-white/40 mt-1">Total Certified</div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CERTIFICATES.map((cert, i) => (
          <motion.div key={cert.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="gp-card overflow-hidden"
            style={{ border: cert.valid ? '1px solid rgba(57,255,20,0.15)' : '1px solid rgba(255,56,96,0.15)' }}>
            {/* Certificate Header */}
            <div className="p-5 border-b border-gp-700/30"
              style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.04), transparent)' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-lime/10 flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-neon-lime" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{cert.type}</div>
                    <div className="text-xs font-mono text-white/30 mt-0.5">{cert.id}</div>
                  </div>
                </div>
                {cert.valid
                  ? <div className="badge-trusted flex items-center gap-1"><CheckCircle className="w-3 h-3" /> VALID</div>
                  : <div className="badge-warning">EXPIRED</div>}
              </div>
            </div>

            {/* Certificate Body */}
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Material',     value: cert.material,   icon: Package  },
                  { label: 'Quantity',     value: `${cert.qty} KG`, icon: Package  },
                  { label: 'Quality',      value: `Grade ${cert.quality}`, icon: Shield },
                  { label: 'Supplier',     value: cert.kabadiwala, icon: Shield   },
                  { label: 'Issued',       value: cert.date,        icon: Calendar },
                  { label: 'Valid Until',  value: cert.expiry,      icon: Calendar },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="glass rounded-lg p-2.5">
                    <div className="text-xs text-white/30 mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-white/80 truncate">{value}</div>
                  </div>
                ))}
              </div>

              {/* Hash */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gp-900/50">
                <Shield className="w-4 h-4 text-neon-lime flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/30">Polygon Blockchain Hash</div>
                  <div className="text-xs font-mono text-white/60 truncate">{cert.hash}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button onClick={() => setPreviewId(cert.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gp-700/40 text-xs text-white/60 hover:text-white/90 hover:bg-gp-800/50 transition-all">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-neon-lime/25 text-xs text-neon-lime hover:bg-neon-lime/10 transition-all">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={() => setPreviewId(null)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            className="gp-card p-8 w-full max-w-lg text-center" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-neon-lime/10 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-neon-lime" />
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-white">GREENPACK</div>
                <div className="text-xs text-white/40">Official Recycling Certificate</div>
              </div>
            </div>
            <div className="glass rounded-xl p-6 mb-4 text-left space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/40">Certificate ID</span><span className="text-white font-mono text-xs">{previewed.id}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Material</span><span className="text-white">{previewed.material}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Quantity</span><span className="text-neon-lime font-bold">{previewed.qty} KG</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Supplier</span><span className="text-white">{previewed.kabadiwala}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Issued</span><span className="text-white">{previewed.date}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/40">Status</span><span className="text-neon-lime font-semibold">✓ BLOCKCHAIN VERIFIED</span></div>
            </div>
            <div className="text-xs font-mono text-white/30 break-all mb-4">{previewed.hash}</div>
            <div className="flex gap-3">
              <button onClick={() => setPreviewId(null)} className="flex-1 py-2.5 rounded-xl border border-gp-700/50 text-sm text-white/50">
                Close
              </button>
              <button className="flex-1 btn-primary justify-center py-2.5 text-sm">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
