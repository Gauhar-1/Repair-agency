'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ThermometerSnowflake } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

// Updated to standard, easy-to-understand English
const NAV_LINKS = [
  { label: 'Local Expertise', href: '#local-expertise' },
  { label: 'Services', href: '#pricing' },
  { label: 'Meet The Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active nav highlighting (Updated IDs)
  useEffect(() => {
    const ids = ['local-expertise', 'pricing', 'team', 'faq'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(`#${id}`);
        },
        { rootMargin: '-40% 0px -50% 0px' } // Triggers when section is near the middle of the screen
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-[#090A0B]/80 border-b border-[#1F2227]/80 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* ==========================================
                LOGO SECTION
                ========================================== */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center transition-all duration-300 group-hover:border-[#479BFF]/50 group-hover:bg-[#479BFF]/10 shadow-inner">
                <ThermometerSnowflake className="w-5 h-5 text-[#479BFF]" />
                {/* Active System Dot (Green for Trust/Online) */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00A650] border-2 border-[#090A0B] animate-pulse" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-50">
                {APP_NAME}
              </span>
            </a>

            {/* ==========================================
                DESKTOP NAVIGATION
                ========================================== */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href;
                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`relative px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-[#479BFF]'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {label}
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#479BFF] rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ==========================================
                RIGHT ACTIONS (Contact & CTA)
                ========================================== */}
            <div className="flex items-center gap-5">
              
              <a
                href="tel:+919876543210"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 hover:text-[#479BFF] transition-colors duration-200 font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>+91 98765-43210</span>
              </a>

              {/* Clear, Standard English CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick('#book')}
                className="hidden sm:flex relative px-6 py-3 text-xs font-bold tracking-widest text-white uppercase rounded-sm bg-[#0062FF] shadow-[0_0_20px_rgba(0,98,255,0.3)] hover:shadow-[0_0_30px_rgba(0,98,255,0.5)] hover:bg-[#479BFF] transition-all cursor-pointer overflow-hidden group"
              >
                <span className="relative z-10">Book Technician</span>
                {/* Button Glint Animation */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[glint_1s_ease-in-out_forwards]" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-[#479BFF] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ==========================================
          MOBILE DRAWER
          ========================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Scrim Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#090A0B]/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#090A0B] border-l border-[#1F2227] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex flex-col pt-24 px-6 flex-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(href)}
                    className={`py-4 text-left text-sm font-bold uppercase tracking-widest border-b border-[#1F2227] transition-colors cursor-pointer ${
                      activeSection === href
                        ? 'text-[#479BFF]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {label}
                  </motion.button>
                ))}

                <div className="mt-auto pb-10">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 mb-4 py-3 text-sm font-bold text-slate-300 border border-[#1F2227] rounded-sm hover:border-[#479BFF] hover:text-[#479BFF] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 98765-43210
                  </a>
                  <button 
                    onClick={() => handleNavClick('#book')}
                    className="w-full py-4 bg-[#0062FF] text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-[#479BFF] transition-colors"
                  >
                    Book Technician
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}