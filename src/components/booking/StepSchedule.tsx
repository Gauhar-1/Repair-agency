'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { getNextDates, formatDateShort } from '@/lib/utils';
import { TIME_SLOTS } from '@/lib/constants';
import type { TimeSlot } from '@/types';

interface StepScheduleProps {
  selectedDate: string | null;
  selectedSlot: TimeSlot | null;
  onDateSelect: (date: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
}

export default function StepSchedule({
  selectedDate,
  selectedSlot,
  onDateSelect,
  onSlotSelect,
}: StepScheduleProps) {
  const dates = getNextDates(7);

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">
        Pick your time
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Select a date and preferred time window.
      </p>

      {/* Date selector */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-sm text-slate-300 font-medium">
          <Calendar className="w-4 h-4 text-teal-400" />
          Select Date
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {dates.map((date) => {
            const iso = date.toISOString().split('T')[0];
            const isToday = iso === new Date().toISOString().split('T')[0];
            const isSelected = selectedDate === iso;

            return (
              <motion.button
                key={iso}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDateSelect(iso)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-400/15 border-teal-400/50 text-teal-400 shadow-[0_0_12px_rgba(0,242,254,0.1)]'
                    : 'bg-navy-800/40 border-white/8 text-slate-300 hover:border-white/15'
                }`}
              >
                <span className="text-[10px] uppercase font-semibold tracking-wider mb-1 opacity-60">
                  {date.toLocaleDateString('en-IN', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
                <span className="text-[10px] opacity-60">
                  {date.toLocaleDateString('en-IN', { month: 'short' })}
                </span>
                {isToday && (
                  <span className="text-[8px] mt-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">
                    TODAY
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Time slot selector */}
      <div>
        <div className="flex items-center gap-2 mb-4 text-sm text-slate-300 font-medium">
          <Clock className="w-4 h-4 text-teal-400" />
          Preferred Window
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIME_SLOTS.map(({ id, label, time, icon }) => {
            const isSelected = selectedSlot === id;
            return (
              <motion.button
                key={id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSlotSelect(id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-teal-400/15 border-teal-400/50 text-teal-400'
                    : 'bg-navy-800/40 border-white/8 text-slate-300 hover:border-white/15'
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <div className="text-left">
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs opacity-60">{time}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
