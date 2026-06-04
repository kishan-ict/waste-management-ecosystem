'use client'

import { useState } from 'react'
import { Package, ScanLine, Camera, Check } from 'lucide-react'

export default function MobileLogWaste() {
  const [step, setStep] = useState(1)
  
  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div className="bg-gp-800/40 border border-gp-700/30 p-5 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ScanLine className="w-24 h-24 text-neon-lime" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-display font-bold text-white mb-2">Log New Waste</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Record incoming materials quickly. Our AI will automatically verify quality.
          </p>
        </div>
      </div>

      {/* iOS Style Segmented Form Steps */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-neon-lime' : 'bg-gp-800'}`} />
        ))}
      </div>

      <div className="mt-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-2 ml-2">Select Material</label>
              <div className="grid grid-cols-2 gap-3">
                {['PET Plastic', 'Cardboard', 'Aluminium', 'Glass'].map(mat => (
                  <button key={mat} className="p-4 rounded-2xl border border-gp-700/50 bg-gp-800/30 text-left hover:bg-neon-lime/10 hover:border-neon-lime/30 active:scale-95 transition-all focus:border-neon-lime focus:ring-1 focus:ring-neon-lime">
                    <Package className="w-5 h-5 text-white/40 mb-2" />
                    <div className="font-semibold text-white text-sm">{mat}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block mb-2 ml-2 mt-4">Estimated Weight (KG)</label>
              <input type="number" placeholder="0.0" className="w-full bg-gp-900 border border-gp-800 rounded-2xl px-5 py-4 text-xl font-bold text-white focus:outline-none focus:border-neon-lime focus:ring-1 focus:ring-neon-lime" />
            </div>

            <button onClick={() => setStep(2)} className="w-full py-4 mt-6 rounded-2xl bg-neon-lime text-gp-950 font-bold text-lg shadow-[0_0_20px_rgba(57,255,20,0.3)] active:scale-[0.98] transition-transform">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="p-8 rounded-3xl border-2 border-dashed border-gp-700 bg-gp-800/20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-gp-800 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Take a Photo</h3>
              <p className="text-sm text-white/50 mb-6">AI needs a photo to verify the grade and quality of the waste.</p>
              
              <button onClick={() => setStep(3)} className="px-6 py-3 rounded-full bg-gp-700 text-white font-semibold">
                Open Camera
              </button>
            </div>
            
            <button onClick={() => setStep(1)} className="w-full py-4 rounded-2xl bg-transparent text-white/50 font-bold">
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-24 h-24 rounded-full bg-neon-lime/20 flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-neon-lime flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.5)]">
                <Check className="w-8 h-8 text-gp-950" strokeWidth={3} />
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">Logged Successfully!</h3>
            <p className="text-white/50 max-w-[250px] mb-8">
              50 KG of PET Plastic has been logged. AI verified it as Grade A.
            </p>
            
            <button onClick={() => setStep(1)} className="w-full py-4 rounded-2xl bg-gp-800 text-white font-bold active:scale-95 transition-transform">
              Log Another
            </button>
          </div>
        )}
      </div>
      
    </div>
  )
}
