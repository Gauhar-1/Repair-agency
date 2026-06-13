'use client';

import { motion } from 'framer-motion';
import { APP_NAME } from '@/lib/constants';
import { Phone, Mail, MapPin, ThermometerSnowflake, ArrowUpRight, Activity } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Diagnostic Booking', href: '#book' },
  { label: 'Standardized Pricing', href: '#pricing' },
  { label: 'Engineering Roster', href: '#team' },
  { label: 'Operational Protocols (FAQ)', href: '#faq' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#090A0B] border-t border-[#1F2227] pt-16 pb-8 overflow-hidden">
      
      {/* Background Ambient Details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#479BFF]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* ==========================================
            TOP ROW: Brand & System Status
            ========================================== */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 pb-8 border-b border-[#1F2227]">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center transition-colors duration-500 group-hover:border-[#479BFF]/50 group-hover:bg-[#479BFF]/10 shadow-inner">
              <ThermometerSnowflake className="w-6 h-6 text-[#479BFF]" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-50 tracking-tight">{APP_NAME}</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#479BFF]">
                Premium Climate Engineering
              </p>
            </div>
          </div>

          {/* Terminal Status Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 bg-[#121417] border border-[#1F2227] rounded-sm shadow-inner">
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-[#00A650] animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#00A650]" />
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                Dispatch System Online
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================
            MIDDLE ROW: Navigation & Contact Columns
            ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Mission Statement */}
          <div className="lg:col-span-1">
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We engineer rapid cooling recovery for residential appliances. Transparent diagnostics, flat-rate pricing, and an un-erasable 30-Day Digital Warranty.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-6">System Links</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-[#479BFF] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-[#479BFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Communications */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-6">Communications</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919876543210"
                  className="group flex items-center gap-3 text-sm font-mono font-semibold text-slate-300 hover:text-[#479BFF] transition-colors"
                >
                  <div className="w-8 h-8 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center group-hover:border-[#479BFF]/30 transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  +91 98765-43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:dispatch@arcticedge.in"
                  className="group flex items-center gap-3 text-sm font-mono font-semibold text-slate-300 hover:text-[#479BFF] transition-colors"
                >
                  <div className="w-8 h-8 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center group-hover:border-[#479BFF]/30 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  dispatch@arcticedge.in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-6">Headquarters</h4>
            <div className="flex items-start gap-3 text-sm font-semibold text-slate-300">
              <div className="w-8 h-8 shrink-0 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <p className="leading-relaxed mt-1">
                Central Dispatch Node<br />
                Guwahati, Assam<br />
                <span className="text-[10px] font-mono text-slate-500 mt-2 block">LAT: 26.1445° N, LON: 91.7362° E</span>
              </p>
            </div>
          </div>

        </div>

        {/* ==========================================
            BOTTOM ROW: Legal & Metadata
            ========================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1F2227]">
          
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
          
          {/* Terminal Metadata readout */}
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <span className="hidden sm:block">Built with precision</span>
            <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
            <span>SYS.REV: 2026.06</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>256-Bit Encrypted</span>
          </div>

        </div>

      </div>
    </footer>
  );
}