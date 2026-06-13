'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { TIMELINE_STEPS } from '@/lib/constants';
import type { BookingStatus } from '@/types';

interface JobTimelineProps {
  currentStatus: BookingStatus;
}

const statusOrder: BookingStatus[] = [
  'confirmed',
  'en_route',
  'diagnosing',
  'repairing',
  'completed',
];

export default function JobTimeline({ currentStatus }: JobTimelineProps) {
  const currentIndex = statusOrder.indexOf(
    currentStatus === 'pending' || currentStatus === 'assigned'
      ? 'confirmed'
      : currentStatus
  );

  return (
    <div className="relative">
      {TIMELINE_STEPS.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <motion.div
            key={step.status}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex gap-4 relative"
          >
            {/* Vertical line */}
            {i < TIMELINE_STEPS.length - 1 && (
              <div
                className={`absolute left-[15px] top-[36px] w-[2px] h-[calc(100%-4px)] ${
                  isCompleted
                    ? 'bg-teal-400'
                    : 'bg-white/10'
                }`}
              />
            )}

            {/* Icon */}
            <div className="relative z-10 shrink-0">
              {isCompleted ? (
                <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-navy-950" />
                </div>
              ) : isCurrent ? (
                <div className="w-8 h-8 rounded-full bg-teal-400/20 border-2 border-teal-400 flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center">
                  <Circle className="w-4 h-4 text-slate-500" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`pb-8 ${isPending ? 'opacity-40' : ''}`}>
              <h4
                className={`font-bold text-sm ${
                  isCurrent ? 'text-teal-400' : isCompleted ? 'text-white' : 'text-slate-400'
                }`}
              >
                {step.label}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {step.description}
              </p>
              {isCurrent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider">
                    In Progress
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
