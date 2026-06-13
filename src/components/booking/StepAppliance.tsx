'use client';

import { motion } from 'framer-motion';
import { AirVent, Refrigerator } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import type { ApplianceType } from '@/types';

interface StepApplianceProps {
  selected: ApplianceType | null;
  onSelect: (appliance: ApplianceType) => void;
}

const appliances = [
  {
    type: 'ac' as const,
    label: 'Air Conditioner',
    description: 'Split AC, Window AC & Cassette Units',
    icon: AirVent,
  },
  {
    type: 'refrigerator' as const,
    label: 'Refrigerator',
    description: 'Single Door, Double Door & Side-by-Side',
    icon: Refrigerator,
  },
];

export default function StepAppliance({
  selected,
  onSelect,
}: StepApplianceProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">
        What needs attention?
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Select the appliance you need serviced.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {appliances.map(({ type, label, description, icon: Icon }) => {
          const isSelected = selected === type;
          return (
            <motion.div
              key={type}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlassCard
                hover={false}
                onClick={() => onSelect(type)}
                className={`cursor-pointer text-center py-10 transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-teal-400/60 bg-teal-400/5 shadow-[var(--shadow-glow-teal)]'
                    : 'hover:border-white/15'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ${
                    isSelected
                      ? 'bg-teal-400/20 text-teal-400'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{label}</h4>
                <p className="text-xs text-slate-400">{description}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
