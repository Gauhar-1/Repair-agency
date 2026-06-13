'use client';

import { cn } from '@/lib/utils';
import { ShieldCheck, Star, AlertTriangle, Flame } from 'lucide-react';

type BadgeVariant = 'verified' | 'popular' | 'warning' | 'critical' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

const badgeConfig: Record<
  BadgeVariant,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  verified: {
    bg: 'bg-emerald-500/15 border-emerald-500/30',
    text: 'text-emerald-400',
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
  },
  popular: {
    bg: 'bg-teal-400/15 border-teal-400/30',
    text: 'text-teal-400',
    icon: <Star className="w-3.5 h-3.5" />,
  },
  warning: {
    bg: 'bg-amber-400/15 border-amber-400/30',
    text: 'text-amber-400',
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  critical: {
    bg: 'bg-red-500/15 border-red-500/30',
    text: 'text-red-500',
    icon: <Flame className="w-3.5 h-3.5" />,
  },
  default: {
    bg: 'bg-slate-500/15 border-slate-500/30',
    text: 'text-slate-400',
    icon: null,
  },
};

export default function Badge({
  variant = 'default',
  children,
  className,
  icon = true,
}: BadgeProps) {
  const config = badgeConfig[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border',
        config.bg,
        config.text,
        className
      )}
    >
      {icon && config.icon}
      {children}
    </span>
  );
}
