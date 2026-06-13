'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ProgressRing from '@/components/ui/ProgressRing';
import Button from '@/components/ui/Button';
import { daysRemaining, warrantyProgress } from '@/lib/utils';
import type { IJob } from '@/types';

interface WarrantyClockProps {
  job: IJob;
  bookingId: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(expiresAt: string | Date): TimeLeft {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function padZero(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function WarrantyClock({ job, bookingId }: WarrantyClockProps) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Don't render if warranty not active or job not completed
  const isActive = job.warranty?.active && job.status === 'completed';

  useEffect(() => {
    if (!isActive || !job.warranty?.expiresAt) return;

    // Calculate immediately
    setTimeLeft(calculateTimeLeft(job.warranty.expiresAt));

    // Tick every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(job.warranty.expiresAt!));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, job.warranty?.expiresAt]);

  if (!isActive) return null;

  const days = job.warranty.expiresAt
    ? daysRemaining(job.warranty.expiresAt)
    : 30;
  const progress = job.warranty.activatedAt
    ? warrantyProgress(job.warranty.activatedAt)
    : 100;

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const res = await fetch('/api/warranty-claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          bookingId,
          reason: 'Emergency warranty claim — customer requested immediate return dispatch',
        }),
      });
      if (res.ok) {
        setClaimed(true);
      }
    } catch (err) {
      console.error('Failed to submit warranty claim:', err);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard glow className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-bold text-white">
            Un-erasable Digital Warranty
          </h3>
        </div>

        {/* Progress ring */}
        <div className="flex justify-center mb-4">
          <ProgressRing percentage={progress} size={140} strokeWidth={10}>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-teal-400">{days}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Days Left
              </p>
            </div>
          </ProgressRing>
        </div>

        {/* Live ticking countdown */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[
            { value: padZero(timeLeft.days), label: 'DD' },
            { value: padZero(timeLeft.hours), label: 'HH' },
            { value: padZero(timeLeft.minutes), label: 'MM' },
            { value: padZero(timeLeft.seconds), label: 'SS' },
          ].map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-1">
              <div className="bg-[#090A0B] border border-[#1F2227] rounded-sm px-2.5 py-1.5 min-w-[44px]">
                <span className="text-lg font-mono font-extrabold text-teal-400 tabular-nums">
                  {unit.value}
                </span>
                <span className="block text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span className="text-lg font-mono text-slate-600 font-bold animate-pulse">:</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-300 mb-2">
          Your{' '}
          <span className="text-white font-semibold">
            30-Day No-Questions-Asked
          </span>{' '}
          Digital Warranty is{' '}
          <span className="text-emerald-400 font-semibold">Active</span>
        </p>
        <p className="text-xs text-slate-500 mb-8">
          Valid until{' '}
          {job.warranty.expiresAt
            ? new Date(job.warranty.expiresAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : '—'}
        </p>

        {/* Warranty claim button */}
        {claimed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25"
          >
            <p className="text-sm font-semibold text-emerald-400">
              ✓ Warranty Claim Submitted
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Our team will contact you within 30 minutes for immediate dispatch.
            </p>
          </motion.div>
        ) : (
          <>
            <Button
              variant="danger"
              size="lg"
              className="w-full"
              onClick={handleClaim}
              loading={claiming}
            >
              <AlertTriangle className="w-4 h-4" />
              Emergency Warranty Claim — Request Immediate Return Dispatch
            </Button>
            <p className="text-[10px] text-slate-500 mt-3">
              One-click claim. No forms. No questions.
            </p>
          </>
        )}
      </GlassCard>
    </motion.div>
  );
}
