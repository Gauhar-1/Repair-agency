'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Crosshair, Zap, Droplets, Thermometer, Eye, ArrowRight, Snowflake, Refrigerator } from 'lucide-react';
import Image from 'next/image';
import { APP_DISTRICT } from '@/lib/constants';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 80, damping: 20 },
  },
};

export default function LocalExpertise() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#090A0B]  border-[#1F2227] overflow-hidden" id="local-expertise">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==========================================
            HEADER & NARRATIVE
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 bg-charcoal-900 border border-charcoal-700 rounded-sm flex items-center justify-center shadow-inner">
              <Crosshair className="w-4 h-4 text-aqua-400" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-aqua-400">
              Regional Climate Audit
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-offwhite-50 mb-6 leading-[1.05]">
            Engineered for <br className="hidden sm:block" />
            <span className="text-gradient-aqua">Extreme Conditions.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-offwhite-200 border-l-2 border-charcoal-700 pl-4 sm:pl-6 leading-relaxed">
            Standard maintenance protocols fail in the Northeast. Our diagnostic workflows are purpose-built to counter specific local threats—from severe monsoon oxidation to deadly grid fluctuations.
          </p>
        </motion.div>

        {/* ==========================================
            THE STICKER BENTO GRID
            ========================================== */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-[auto] md:auto-rows-[340px]"
        >
          
          {/* ----------------------------------------------------
              TILE 1: Wide Card (Corrosion) | Col Span 8
              ---------------------------------------------------- */}
          <motion.div
            variants={cardVariants}
            className="group relative md:col-span-8 bg-gradient-to-br from-[#121A25] to-[#1A2534] border border-aqua-500/10 rounded-sm overflow-hidden flex flex-col sm:flex-row transition-all duration-500 hover:border-aqua-400/40 hover:shadow-[0_0_50px_rgba(8,217,214,0.1)]"
          >
            {/* Interactive Background Glow */}
            <div className="absolute top-0 right-0 w-[120%] sm:w-[80%] h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-aqua-400/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Content Side */}
            <div className="relative z-10 flex flex-col justify-between w-full sm:w-[55%] p-6 sm:p-8 h-full">
              <div>
                <div className="w-10 h-10 rounded-sm bg-aqua-500/10 border border-aqua-400/20 flex items-center justify-center mb-5 sm:mb-8 transition-transform group-hover:scale-110">
                  <Droplets className="w-5 h-5 text-aqua-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-offwhite-50 mb-3 tracking-tight">Anti-Corrosion Protocol</h3>
                <p className="text-sm text-offwhite-300 leading-relaxed mb-6">
                  Hydrophobic nano-barriers prevent copper-aluminum junction degradation—the absolute #1 silent killer of condensers in high humidity.
                </p>
              </div>
              <div className="pt-4 sm:pt-6 border-t border-aqua-500/10 flex items-end gap-3 sm:gap-4 mt-auto">
                <span className="text-5xl sm:text-6xl font-bold font-mono text-offwhite-50 tracking-tighter leading-none">85%<span className="text-3xl sm:text-4xl text-aqua-400">+</span></span>
                <span className="text-[10px] sm:text-xs font-bold text-aqua-400/80 uppercase tracking-widest pb-1 sm:pb-1.5 leading-tight">Avg. Humidity <br/> {APP_DISTRICT}</span>
              </div>
            </div>

            {/* Sticker Image Side */}
            <div className="relative z-20 w-full sm:w-[45%] h-64 sm:h-full mt-auto sm:mt-0 perspective-1000">
              <motion.div 
                animate={{ y: [-5, 5, -5], rotateZ: [-0.5, 0.5, -0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 right-[-10%] sm:right-[-20%] drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
              >
                <Image
                  src="/images/sticker-coil.png" 
                  alt="AC Coil Nano Coating"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-right-bottom sm:object-center scale-110 sm:scale-125 transform-gpu group-hover:scale-[1.3] transition-transform duration-700"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* ----------------------------------------------------
              TILE 2: Tall Card (Grid Balancing) | Col Span 4, Row Span 2
              ---------------------------------------------------- */}
          <motion.div
            variants={cardVariants}
            className="group relative md:col-span-4 md:row-span-2 bg-gradient-to-b from-[#1F181A] to-[#251A1D] border border-coral-500/10 rounded-sm overflow-hidden flex flex-col p-6 sm:p-8 transition-all duration-500 hover:border-coral-500/40 hover:shadow-[0_0_50px_rgba(255,46,99,0.1)]"
          >
            {/* Interactive Danger Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-coral-500 opacity-80 group-hover:shadow-[0_0_20px_rgba(255,46,99,0.8)] transition-shadow duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-coral-500/5 to-transparent pointer-events-none group-hover:from-coral-500/10 transition-colors duration-500" />

            <div className="relative z-10 w-10 h-10 rounded-sm bg-coral-500/10 border border-coral-500/20 flex items-center justify-center mb-6 sm:mb-8 transition-transform group-hover:scale-110">
              <Zap className="w-5 h-5 text-coral-500" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-offwhite-50 mb-2 tracking-tight">Smart Grid Sync</h3>
              <p className="text-[10px] font-bold text-coral-400 uppercase tracking-widest mb-4">PCB Defense Protocol</p>
              <p className="text-sm text-offwhite-300 leading-relaxed">
                Inverter PCB evaluations to safeguard electronics against local power anomalies. We calibrate voltage thresholds before your board silently fries.
              </p>
            </div>

            {/* Floating Sticker Image (Middle) */}
            <div className="relative z-20 flex-1 w-full min-h-[180px] sm:min-h-[220px] perspective-1000 my-6">
              <motion.div 
                animate={{ y: [4, -4, 4], rotateZ: [1, -1, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 drop-shadow-[0_20px_30px_rgba(255,46,99,0.15)]"
              >
                <Image
                  src="/images/sticker-pcb.png" 
                  alt="Inverter PCB Diagnostics"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-contain object-center scale-[1.15] transform-gpu group-hover:scale-[1.25] transition-transform duration-700"
                />
              </motion.div>
            </div>

            <div className="relative z-10 pt-4 sm:pt-6 border-t border-coral-500/10 mt-auto">
              <div className="text-4xl sm:text-5xl font-bold font-mono text-offwhite-50 tracking-tighter leading-none mb-2">
                180<span className="text-2xl sm:text-3xl text-charcoal-500">-</span>260<span className="text-2xl sm:text-3xl text-coral-500">V</span>
              </div>
              <p className="text-[10px] font-bold text-coral-500/80 uppercase tracking-widest">Dangerous Grid Fluctuation</p>
            </div>
          </motion.div>

          {/* ----------------------------------------------------
              TILE 3: Square Card (Thermodynamic) | Col Span 4
              ---------------------------------------------------- */}
          <motion.div
            variants={cardVariants}
            className="group relative md:col-span-4 bg-gradient-to-br from-[#121A25] to-[#161D28] border border-charcoal-700 rounded-sm overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-aqua-400/40"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-offwhite-50 leading-tight">Thermodynamic <br/> Calibration</h3>
                <Thermometer className="w-5 h-5 text-aqua-400" />
              </div>
              <div className="flex items-end gap-2 mt-4 sm:mt-8">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-offwhite-50 tracking-tighter leading-none">42°<span className="text-3xl text-aqua-400">C+</span></span>
                <span className="text-[10px] font-bold text-aqua-400/80 uppercase tracking-widest pb-1">Peak Heat</span>
              </div>
            </div>

            {/* Corner Floating Sticker */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 w-48 sm:w-56 h-48 sm:h-56 z-0 drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] opacity-90 group-hover:opacity-100 transition-opacity"
            >
              <Image
                src="/images/sticker-gauge.png"
                alt="Digital HVAC Gauge"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain transform-gpu group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>

          {/* ----------------------------------------------------
              TILE 4: Square Card (Refrigerator Recovery) | Col Span 4
              ---------------------------------------------------- */}
          <motion.div
            variants={cardVariants}
            className="group relative md:col-span-4 bg-gradient-to-tr from-[#12161E] to-[#1A202A] border border-charcoal-700 rounded-sm overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#479BFF]/30"
          >
            {/* Subtle Frost/Cooling Glow Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#479BFF]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-offwhite-50 leading-tight">Compressor <br/> Diagnostics</h3>
              <Refrigerator className="w-5 h-5 text-offwhite-100 transition-colors group-hover:text-[#479BFF]" />
            </div>
            
            <div className="relative z-10 mt-auto pt-16 sm:pt-20">
              <p className="text-sm text-offwhite-300 mb-4 max-w-[210px] relative z-20">
                Advanced thermal recovery for refrigerators. We fix failing compressors before your perishables spoil.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#479BFF] uppercase tracking-widest relative z-20">
                <Snowflake className="w-4 h-4" /> Deep Freeze Restored
              </div>
            </div>

            {/* Corner Floating Sticker (Compressor/Motor) */}
            <motion.div 
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 w-48 sm:w-56 h-48 sm:h-56 z-0 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            >
              <Image
                src="/images/sticker-compressor.png"
                alt="High-tech refrigerator compressor"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-contain transform-gpu group-hover:-translate-y-3 group-hover:-rotate-2 group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}