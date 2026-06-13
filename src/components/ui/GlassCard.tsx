'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'glass rounded-2xl p-6',
        glow && 'glow-border',
        hover && 'cursor-pointer',
        'transition-shadow duration-300',
        hover && 'hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
