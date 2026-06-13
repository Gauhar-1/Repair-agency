'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Chip({
  label,
  selected = false,
  onClick,
  className,
}: ChipProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer',
        selected
          ? 'bg-teal-400/15 border-teal-400/50 text-teal-400 shadow-[0_0_15px_rgba(0,242,254,0.1)]'
          : 'bg-navy-800/60 border-white/10 text-slate-300 hover:border-white/20 hover:text-white',
        className
      )}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          <Check className="w-3.5 h-3.5" />
        </motion.span>
      )}
      {label}
    </motion.button>
  );
}
