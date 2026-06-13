'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Star, Wrench } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import type { ITechnician } from '@/types';

interface TechnicianCardProps {
  technician: ITechnician;
}

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <GlassCard glow className="p-6">
        <div className="flex items-center gap-4">
          {/* Headshot */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400/20 to-navy-700 flex items-center justify-center overflow-hidden border border-white/10">
              <Wrench className="w-7 h-7 text-teal-400" />
            </div>
            {/* Verified checkmark */}
            {technician.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-navy-900">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">
              {technician.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <Badge variant="verified">Background Verified</Badge>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {technician.rating}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/5">
          <div className="text-center">
            <p className="text-lg font-bold text-teal-400">
              {technician.experience}
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Experience
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white">
              {technician.specializations?.length || 2}
            </p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Specializations
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-400">Verified</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              ID &amp; Background
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
