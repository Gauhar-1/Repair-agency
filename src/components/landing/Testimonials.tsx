'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ExternalLink, Quote, ChevronLeft, ChevronRight, CheckCircle, Crosshair, Wrench } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  date: string;
  text: string;
  rating: number;
  workDone: string;
  workImageSrc: string; // The proof of work image
  bgGradient: string; // Unique deep color for each card
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ananya Borah',
    location: 'Beltola, Guwahati',
    date: '3 days ago',
    text: 'ArcticEdge sent a video of the gas leak before charging anything. No AC repair guy has ever done that. Found the split AC leak in under 2 hours. video-proof sold me.',
    rating: 5,
    workDone: 'Monsoon-Grade Protection (Jet Clean)',
    workImageSrc: '/images/work-proof-1.jpg', // AI Placeholder
    bgGradient: 'from-[#0A1118] to-[#122235]', // Deep Arctic Blue
  },
  {
    id: 2,
    name: 'Dr. Kamal Hazarika',
    location: 'Zoo Road, Guwahati',
    date: '1 week ago',
    text: 'Moved from gig-economy apps. ArcticEdge sent Rahul—the same guy—for my second service. Fixed the complex voltage spike issue. The annual pass is worth every rupee.',
    rating: 5,
    workDone: 'Smart Grid & Inverter PCB Sync',
    workImageSrc: '/images/work-proof-2.jpg', // AI Placeholder
    bgGradient: 'from-[#17110B] to-[#2A1B10]', // Forged Copper/Amber
  },
  {
    id: 3,
    name: 'Priya Choudhury',
    location: 'Chandmari, Guwahati',
    date: '2 weeks ago',
    text: 'My fridge was making a horrible noise. They showed me the exact thermodynamic coil degradation on camera, and replaced the OEM compressor part the next day. feels premium.',
    rating: 5,
    workDone: 'Thermodynamic Calibration (Fridge)',
    workImageSrc: '/images/work-proof-3.jpg', // AI Placeholder
    bgGradient: 'from-[#091513] to-[#112A26]', // Dark Emerald
  },
  {
    id: 4,
    name: 'Meenakshi Devi',
    location: 'Paltan Bazaar, Guwahati',
    date: '1 month ago',
    text: 'Used the warranty claim button when my AC started leaking again after 12 days. Callback in 15 minutes and technician at my door within 90 minutes. zero questions asked.',
    rating: 5,
    workDone: 'Seal & Charge (Warranty Claim)',
    workImageSrc: '/images/work-proof-4.jpg', // AI Placeholder
    bgGradient: 'from-[#110D15] to-[#201828]', // Void Slate/Purple
  },
];

const AUTOPLAY_INTERVAL = 8000; // Increased slightly so users can read and admire the photo

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const advanceSlide = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      advanceSlide(1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advanceSlide]);

  const handleManualNavigation = (newDirection: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    advanceSlide(newDirection);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-24 lg:py-32 bg-[#090A0B] border-[#1F2227] overflow-hidden" id="testimonials">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==========================================
            SECTION HEADER
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-12 lg:mb-20 flex flex-col items-start"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 bg-[#121417] border border-[#1F2227] rounded-sm flex items-center justify-center shadow-inner">
              <Crosshair className="w-4 h-4 text-[#479BFF]" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#479BFF]">
              Verified Field Proof
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-50 mb-6 leading-[1.05]">
            See The Work. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#479BFF] to-[#0062FF] font-serif italic font-light tracking-normal">Hear The Results.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-xl border-l-2 border-[#1F2227] pl-4">
            Zero generic avatars. Zero fabricated copy. Real field photography and feedback from verified service completions across Guwahati.
          </p>
        </motion.div>

        {/* ==========================================
            HORIZONTAL CAROUSEL TRACK
            ========================================== */}
        <div className="relative overflow-hidden min-h-[600px] lg:min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Dynamic Colored Card */}
              <div className={`relative w-full max-w-[1200px] rounded-sm border border-[#1F2227]/80 bg-gradient-to-br ${currentTestimonial.bgGradient} overflow-hidden shadow-2xl group flex flex-col lg:flex-row h-full`}>
                
                {/* --- Left Column: Review Body --- */}
                <div className="relative z-10 w-full lg:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col justify-center h-full">
                  <Quote className="absolute top-6 left-6 w-24 h-24 text-white/5 rotate-6 pointer-events-none" />

                  {/* Rating & Location */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
                    <div className="flex gap-1">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-50">{currentTestimonial.name}</p>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{currentTestimonial.location}</p>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-lg sm:text-2xl text-slate-200 leading-relaxed mb-8 relative z-10">
                    &ldquo;
                    {currentTestimonial.text.split(/(PCB Sync|Video-Proof|Fridge Recovery|Warranty Claim)/).map((part, i) => (
                      <span key={i} className={i % 2 === 1 ? 'font-serif italic font-light text-white' : ''}>
                        {part}
                      </span>
                    ))}
                    &rdquo;
                  </p>

                  {/* Metadata Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Task:</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300 rounded-sm">
                        <Wrench className="w-3 h-3" />
                        {currentTestimonial.workDone}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-black/20 px-3 py-1 rounded-sm border border-white/5">
                      {currentTestimonial.date}
                    </span>
                  </div>
                </div>

                {/* --- Right Column: The Proof of Work Image --- */}
                <div className="relative w-full lg:w-1/2 h-[300px] lg:h-full min-h-[300px] border-t lg:border-t-0 lg:border-l border-white/10 overflow-hidden bg-[#090A0B]">
                  {/* Verified Tag Overlay */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-[#00A650]/30 rounded-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00A650]" />
                    <span className="text-[9px] font-bold text-[#00A650] uppercase tracking-widest">
                      Verified Field Photo
                    </span>
                  </div>

                  {/* The Image (Grayscale -> Color on Hover) */}
                  <Image
                    src={currentTestimonial.workImageSrc}
                    alt={`Work completed for ${currentTestimonial.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette shadow to blend with the card */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] pointer-events-none" />
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ==========================================
            PROGRESSIVE INDICATORS (Line & Dot)
            ========================================== */}
        <div className="mt-10 flex items-center justify-center gap-4 relative">
          
          <button onClick={() => handleManualNavigation(-1)} className="p-3 bg-[#121417] border border-[#1F2227] text-slate-400 hover:text-[#479BFF] hover:border-[#479BFF]/50 transition-all rounded-sm shadow-inner">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => {
              const isActive = currentIndex === index;
              return (
                <div
                  key={index}
                  className="relative transition-all duration-500 ease-out"
                  style={{
                    width: isActive ? '80px' : '10px',
                    height: '10px'
                  }}
                >
                  {isActive ? (
                    // Active: Animated Blue Line
                    <div className="absolute inset-0 bg-[#0062FF]/20 rounded-sm overflow-hidden border border-[#0062FF]/30">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-[#479BFF]"
                        initial={false}
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                      />
                    </div>
                  ) : (
                    // Non-Active: Static Dot
                    <button 
                      onClick={() => {
                        if (timerRef.current) clearInterval(timerRef.current);
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className="absolute inset-0 bg-[#1F2227] rounded-full border border-[#2D3139] scale-[0.7] hover:scale-100 hover:bg-[#479BFF] transition-all cursor-pointer" 
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button onClick={() => handleManualNavigation(1)} className="p-3 bg-[#121417] border border-[#1F2227] text-slate-400 hover:text-[#479BFF] hover:border-[#479BFF]/50 transition-all rounded-sm shadow-inner">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}