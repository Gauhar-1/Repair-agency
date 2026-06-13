'use client';

import { motion } from 'framer-motion';
import { Video, Package, ShieldCheck } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import type { IJob } from '@/types';

interface DiagnosticSandboxProps {
  job: IJob;
}

export default function DiagnosticSandbox({ job }: DiagnosticSandboxProps) {
  const showDiagnostics = ['diagnosing', 'repairing', 'completed'].includes(
    job.status
  );

  if (!showDiagnostics) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">Live Diagnostic Sandbox</h3>
            <p className="text-xs text-slate-400">
              Evidence &amp; verification center
            </p>
          </div>
        </div>

        {/* Video placeholder */}
        <div className="rounded-xl bg-navy-950 border border-white/5 aspect-video flex flex-col items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-teal-400/10 flex items-center justify-center mb-3">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-teal-400 ml-1" />
          </div>
          <p className="text-sm text-slate-300 font-medium">
            Uploaded Diagnostic Video Proof
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Verified Gas Leak Location
          </p>
        </div>

        {/* OEM Part Guarantee */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-emerald-400">
                Original OEM Parts Guarantee
              </p>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">
              All replacement parts sourced directly from authorized OEM channels
              with verifiable serial numbers.
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
