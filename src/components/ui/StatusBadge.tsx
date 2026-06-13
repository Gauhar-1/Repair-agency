'use client';

import { cn } from '@/lib/utils';
import type { BookingStatus, JobStatus } from '@/types';

interface StatusBadgeProps {
  status: BookingStatus | JobStatus;
  className?: string;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-slate-500/20 text-slate-400 border-slate-500/30', label: 'Pending' },
  confirmed: { color: 'bg-teal-400/15 text-teal-400 border-teal-400/30', label: 'Confirmed' },
  assigned: { color: 'bg-teal-400/15 text-teal-400 border-teal-400/30', label: 'Assigned' },
  en_route: { color: 'bg-amber-400/15 text-amber-400 border-amber-400/30', label: 'En Route' },
  diagnosing: { color: 'bg-amber-400/15 text-amber-400 border-amber-400/30', label: 'Diagnosing' },
  repairing: { color: 'bg-teal-400/15 text-teal-400 border-teal-400/30', label: 'Repairing' },
  completed: { color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', label: 'Completed' },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border',
        config.color,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {config.label}
    </span>
  );
}
