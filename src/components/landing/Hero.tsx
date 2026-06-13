'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import Image from 'next/image';
import { APP_DISTRICT } from '@/lib/constants';

export default function Hero() {
  const handleScroll = () => {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#090A0B] border-b  overflow-hidden pt-20 lg:pt-0">
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        
        {/* ==========================================
            LEFT PANEL: The Command Console
            ========================================== */}
       <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-16 lg:py-24 z-20">
  
  {/* Main Headline */}
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-50 tracking-tight leading-[1.05] mb-6"
  >
    Expert AC & Fridge Repair. <br />
    No <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#479BFF] to-[#0062FF]">Hidden Costs.</span>
  </motion.h1>

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed border-l-2 border-[#479BFF]/50 pl-4"
  >
    Professional repair, installation, and maintenance for your home appliances. From deep pressure cleaning to gas leak fixes and complete AC installations—all backed by a 30-day warranty.
  </motion.p>

  {/* CTA Button & Trust Badge */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className="flex flex-col sm:flex-row items-center gap-5"
  >
    <button 
      onClick={handleScroll}
      className="group relative w-full sm:w-auto px-8 py-4 bg-[#0062FF] text-white text-sm font-bold uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(0,98,255,0.3)] hover:shadow-[0_0_30px_rgba(0,98,255,0.5)] hover:bg-[#479BFF] transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        Book Technician
        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
      {/* Button Glint Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[glint_1s_ease-in-out_forwards]" />
    </button>
    
    <p className="text-sm text-slate-300 font-medium flex items-center gap-2">
      <CheckCircle2 className="w-5 h-5 text-[#00A650]" />
      Upfront, Flat-Rate Pricing
    </p>
  </motion.div>

  {/* Quick Services Grid (Plain English) */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.6 }}
    className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 border-t border-[#1F2227] pt-8"
  >
    {/* Service 1 */}
    <div className="flex flex-col gap-1">
      <span className="text-slate-50 font-bold text-sm">Deep Jack-Pump Cleaning</span>
      <span className="text-slate-400 text-xs">High-pressure wash for max cooling</span>
    </div>
    
    {/* Service 2 */}
    <div className="flex flex-col gap-1">
      <span className="text-slate-50 font-bold text-sm">Gas Leak Fix & Refill</span>
      <span className="text-slate-400 text-xs">Leak detection and complete gas filling</span>
    </div>
    
    {/* Service 3 */}
    <div className="flex flex-col gap-1 sm:mt-2">
      <span className="text-slate-50 font-bold text-sm">AC Installation & Fitting</span>
      <span className="text-slate-400 text-xs">Complete setup, outdoor stand included</span>
    </div>
    
    {/* Service 4 */}
    <div className="flex flex-col gap-1 sm:mt-2">
      <span className="text-slate-50 font-bold text-sm flex items-center gap-1.5">
        General Servicing <ShieldAlert className="w-3.5 h-3.5 text-[#479BFF]" />
      </span>
      <span className="text-slate-400 text-xs">Fast fixes for ACs and Refrigerators</span>
    </div>
  </motion.div>
  
</div>

        {/* ==========================================
            RIGHT PANEL: The Edge-to-Edge Visual
            ========================================== */}
        <div className="w-full lg:w-[45%] h-[500px] lg:h-auto relative hidden sm:block border-l border-charcoal-700/50">
          
          {/* Base Layer: Dark Tint */}
          <div className="absolute inset-0 bg-charcoal-950/20 z-10 mix-blend-multiply" />
          
          {/* Gradient Fade to blend with left panel on mobile/tablet */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-950 to-transparent z-10 lg:hidden" />

          <Image
  src="/images/hero-console.jpg" 
  alt="Advanced Appliance Engineering"
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"  
  className="object-cover object-left lg:object-center grayscale-[20%] contrast-125"
  priority
/>

          {/* Interactive Radar/Tracker Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="absolute bottom-12 right-12 z-20 glass-light p-5 rounded-sm border border-aqua-400/20 backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center gap-4 border-b border-charcoal-700/50 pb-3 mb-3">
              <div className="w-2 h-2 bg-coral-500 rounded-full animate-pulse" />
              <p className="text-xs text-offwhite-100 font-mono tracking-widest uppercase">Active Field Tech</p>
            </div>
            <div className="flex justify-between items-end gap-8">
              <div>
                <p className="text-2xl font-bold text-offwhite-50">T-14</p>
                <p className="text-xs text-offwhite-300">En Route to Ghy-South</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-aqua-400">ETA: 18 Min</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Glint Animation Keyframe (Add to globals.css if not using Tailwind arbitrary variants) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glint {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}} />
    </section>
  );
}