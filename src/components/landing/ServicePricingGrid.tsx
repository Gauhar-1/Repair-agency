'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Crosshair, Search, ArrowRight, Activity } from 'lucide-react';

// Upgraded Data Structure with "Terminal" Metadata
const coverageZones = [
  {
    region: 'Dibrugarh Hub',
    zoneCode: 'ZONE-DBR',
    locations: [
      { name: 'Dibrugarh', coords: '27.4728° N' },
      { name: 'Chabua', coords: '27.4815° N' },
      { name: 'Lahoal', coords: '27.4333° N' },
      { name: 'Chaulkhowa', coords: '27.4561° N' },
    ],
  },
  {
    region: 'Tinsukia Network',
    zoneCode: 'ZONE-TSK',
    locations: [
      { name: 'Tinsukia', coords: '27.4922° N' },
      { name: 'Duliajan', coords: '27.3653° N' },
      { name: 'Digboi', coords: '27.3824° N' },
      { name: 'Doom Dooma', coords: '27.5684° N' },
      { name: 'Makum', coords: '27.5057° N' },
      { name: 'Margherita', coords: '27.2804° N' },
    ],
  },
  {
    region: 'Extended Grid',
    zoneCode: 'ZONE-EXT',
    locations: [
      { name: 'Ledo', coords: '27.2917° N' },
      { name: 'Talap', coords: '27.5833° N' },
      { name: 'Borhapjan', coords: '27.5333° N' },
      { name: 'Panitola', coords: '27.4833° N' },
      { name: 'Hansara', coords: '27.5500° N' },
      { name: 'Pengaree', coords: '27.4000° N' },
      { name: 'Sadiya', coords: '27.8333° N' },
    ],
  },
  {
    region: 'Arunachal Border',
    zoneCode: 'ZONE-AR',
    locations: [
      { name: 'Roing', coords: '28.1333° N' },
      { name: 'Namsai', coords: '27.6667° N' },
    ],
  },
];

export default function ServiceLocations() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleScroll = () => {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#090A0B] border-t border-[#1F2227] overflow-hidden" id="locations">
      
      {/* Abstract Topographical Background Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, #ffffff 1px, transparent 1px, transparent 40px)' }} 
      />
      
      {/* Dynamic Glow responding to search state */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${searchTerm ? 'bg-[#00A650]/5' : 'bg-[#479BFF]/5'}`} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* ==========================================
            HEADER & LIVE SEARCH CONSOLE
            ========================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 lg:mb-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 bg-[#121417] border border-[#1F2227] rounded-sm flex items-center justify-center shadow-inner">
                <MapPin className="w-4 h-4 text-[#479BFF]" />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#479BFF]">
                Live Dispatch Network
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-50 mb-6 leading-[1.1]">
              Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#479BFF] to-[#0062FF]">Coverage Zones.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed border-l-2 border-[#1F2227] pl-4">
              We operate a hyper-local engineering fleet across Upper Assam and Arunachal borders. Type your location to verify live dispatch availability.
            </p>
          </motion.div>

          {/* Search Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-96 shrink-0 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#479BFF]/20 to-[#0062FF]/20 rounded-sm blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
            <div className="relative flex items-center bg-[#121417] border border-[#1F2227] rounded-sm overflow-hidden">
              <div className="pl-4 pr-3">
                {searchTerm ? (
                  <Activity className="w-5 h-5 text-[#00A650] animate-pulse" />
                ) : (
                  <Search className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <input
                type="text"
                placeholder="Enter your town (e.g. Duliajan)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 pr-4 bg-transparent text-slate-50 placeholder:text-slate-500 focus:outline-none font-mono text-sm uppercase tracking-wider"
              />
            </div>
          </motion.div>
        </div>

        {/* ==========================================
            INTERACTIVE MATRIX GRID
            ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coverageZones.map((zone, zoneIndex) => {
            
            // Check if this zone contains a matching search term
            const hasMatchInZone = zone.locations.some(loc => 
              loc.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            // If searching and this zone has NO matches, dim the whole zone
            const dimZone = searchTerm !== '' && !hasMatchInZone;

            return (
              <motion.div 
                key={zone.region} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: zoneIndex * 0.1 }}
                className={`relative rounded-sm border transition-all duration-500 p-6 sm:p-8 ${
                  dimZone 
                    ? 'bg-[#090A0B] border-[#121417] opacity-40 grayscale' 
                    : 'bg-[#121417]/30 border-[#1F2227] hover:bg-[#121417] hover:border-[#479BFF]/30 hover:shadow-[0_10px_30px_rgba(0,98,255,0.05)]'
                }`}
              >
                {/* Zone Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F2227]">
                  <h3 className="text-lg font-bold text-slate-100 tracking-wide">
                    {zone.region}
                  </h3>
                  <span className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest bg-[#1F2227]/50 px-2 py-1 rounded-sm">
                    {zone.zoneCode}
                  </span>
                </div>

                {/* Locations */}
                <ul className="space-y-1">
                  {zone.locations.map((loc, idx) => {
                    const isMatch = searchTerm !== '' && loc.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const notMatchWhenSearching = searchTerm !== '' && !isMatch;

                    return (
                      <li 
                        key={idx}
                        className={`group/item relative flex items-center justify-between p-2 rounded-sm transition-all duration-300 cursor-default ${
                          isMatch ? 'bg-[#479BFF]/10 ring-1 ring-[#479BFF]/30' : 'hover:bg-[#1F2227]/50'
                        } ${notMatchWhenSearching ? 'opacity-30' : 'opacity-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Status Dot */}
                          <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                            <span className={`absolute inline-flex w-full h-full rounded-full opacity-60 ${isMatch ? 'bg-[#00A650] animate-ping' : 'bg-slate-600 group-hover/item:bg-[#00A650] group-hover/item:animate-ping'} transition-colors duration-300`} />
                            <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${isMatch ? 'bg-[#00A650]' : 'bg-slate-500 group-hover/item:bg-[#00A650]'} transition-colors duration-300`} />
                          </div>
                          
                          <span className={`text-sm font-medium transition-all duration-300 ${isMatch ? 'text-white translate-x-1' : 'text-slate-400 group-hover/item:text-slate-100 group-hover/item:translate-x-1'}`}>
                            {loc.name}
                          </span>
                        </div>

                        {/* Hover/Match Metadata Reveal */}
                        <div className={`overflow-hidden transition-all duration-300 ${isMatch ? 'w-auto opacity-100' : 'w-0 opacity-0 group-hover/item:w-auto group-hover/item:opacity-100'}`}>
                          <span className={`text-[9px] font-mono tracking-widest whitespace-nowrap pl-4 ${isMatch ? 'text-[#00A650]' : 'text-[#479BFF]'}`}>
                            {loc.coords}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* ==========================================
            DYNAMIC BOTTOM CTA
            ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searchTerm ? 'searching' : 'idle'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-sm border transition-colors duration-500 ${
              searchTerm 
                ? 'bg-gradient-to-r from-[#00A650]/10 to-[#090A0B] border-[#00A650]/30' 
                : 'bg-gradient-to-r from-[#121417] to-[#121417]/50 border-[#1F2227]'
            }`}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={`w-12 h-12 rounded-sm border flex items-center justify-center shrink-0 transition-colors duration-500 ${
                searchTerm ? 'bg-[#00A650]/20 border-[#00A650]/40' : 'bg-[#1F2227] border-[#2D3139]'
              }`}>
                {searchTerm ? <Crosshair className="w-6 h-6 text-[#00A650]" /> : <MapPin className="w-6 h-6 text-slate-400" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-50">
                  {searchTerm ? 'Location Verified.' : 'Is your town listed above?'}
                </h4>
                <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${searchTerm ? 'text-[#00A650]' : 'text-slate-400'}`}>
                  {searchTerm ? 'Units are available for dispatch.' : 'We are ready to deploy our technicians.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleScroll}
              className={`w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all active:scale-95 flex items-center justify-center gap-2 group ${
                searchTerm
                  ? 'bg-[#00A650] text-[#090A0B] hover:bg-[#00cc66] shadow-[0_0_20px_rgba(0,166,80,0.3)]'
                  : 'bg-[#0062FF] text-white hover:bg-[#479BFF] shadow-[0_0_20px_rgba(0,98,255,0.2)]'
              }`}
            >
              Book Technician
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}