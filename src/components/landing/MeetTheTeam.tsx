'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star, Crosshair } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  experience: string;
  specialties: string[];
  rating: number;
  imageSrc: string;
}

const team: TeamMember[] = [
  {
    id: 'rahul',
    name: 'Rahul',
    designation: 'Senior HVAC Specialist',
    experience: '5+ Years Field',
    specialties: ['Split AC', 'VRF Systems', 'Inverter Tech'],
    rating: 4.9,
    imageSrc: '/images/team-1.jpg', // AI Placeholder
  },
  {
    id: 'bikram',
    name: 'Bikram',
    designation: 'Refrigeration Engineer',
    experience: '7+ Years Field',
    specialties: ['Compressor Diagnostics', 'Deep Freezers', 'PCB'],
    rating: 4.8,
    imageSrc: '/images/team-2.jpg', // AI Placeholder
  },
  {
    id: 'joy',
    name: 'Joy',
    designation: 'Climate Systems Analyst',
    experience: '5+ Years Field',
    specialties: ['Electrical Audits', 'Grid Analysis', 'Wiring'],
    rating: 4.9,
    imageSrc: '/images/team-3.jpg', // AI Placeholder
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 }, opacity: 1, },
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

export default function MeetTheTeam() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#090A0B]  border-[#1F2227] overflow-hidden" id="team">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* ==========================================
            HEADER 
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24 flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 bg-charcoal-900 border border-charcoal-700 rounded-sm flex items-center justify-center shadow-inner">
              <Crosshair className="w-4 h-4 text-aqua-400" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-aqua-400">
              Full-Time W-2 Engineers
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-offwhite-50 mb-6 leading-[1.1]">
            Our Exclusive <br className="hidden sm:block" />
            <span className="text-gradient-aqua">Engineering Roster.</span>
          </h2>
          
          <p className="text-base sm:text-lg text-offwhite-200 max-w-2xl mx-auto leading-relaxed">
            We never outsource to random freelancers or gig-economy workers. Every technician is a salaried, background-verified, full-time specialist on our direct payroll.
          </p>
        </motion.div>

        {/* ==========================================
            TEAM GRID 
            ========================================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group relative rounded-sm border border-charcoal-700 bg-charcoal-900 overflow-hidden transition-all duration-500 hover:border-aqua-400/50 hover:shadow-[0_20px_40px_rgba(8,217,214,0.1)] hover:-translate-y-1"
            >
              
              {/* Security Clearance Badge */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-charcoal-950/80 backdrop-blur-md border border-emerald-500/30 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                  Verified Clearance
                </span>
              </div>

              {/* Cinematic Image Frame */}
              <div className="relative h-72 sm:h-80 w-full bg-charcoal-950 overflow-hidden">
                <Image
                  src={member.imageSrc}
                  alt={`${member.name} - ${member.designation}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Gradient Scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent z-10" />
              </div>

              {/* Data Content */}
              <div className="p-6 sm:p-8 relative z-20 -mt-12">
                <h3 className="text-3xl font-bold text-offwhite-50 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-aqua-400 uppercase tracking-widest mb-6">
                  {member.designation}
                </p>

                {/* Metrics Row */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-charcoal-700/50">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-offwhite-400 uppercase tracking-widest">Experience</span>
                    <span className="text-sm font-bold font-mono text-offwhite-100">{member.experience}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-offwhite-400 uppercase tracking-widest">Rating</span>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-coral-500 fill-coral-500" />
                      <span className="text-sm font-bold font-mono text-offwhite-100">{member.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties Chips */}
                <div>
                  <span className="block text-[10px] text-offwhite-400 uppercase tracking-widest mb-3">Core Specialties</span>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-sm bg-charcoal-800 border border-charcoal-700 text-[10px] font-bold text-offwhite-200 uppercase tracking-wider group-hover:border-aqua-400/30 transition-colors"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}