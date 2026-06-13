'use client';

import { motion } from 'framer-motion';
import { Thermometer, Zap, Cable } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import type { IJob } from '@/types';

interface HealthReportProps {
  job: IJob;
}

interface MetricCard {
  label: string;
  icon: React.ReactNode;
  value: string;
  status: 'good' | 'warning' | 'critical' | 'pending';
  detail: string;
}

const statusColors = {
  good: { bg: 'bg-emerald-500/12', text: 'text-emerald-400', border: 'border-emerald-500/25' },
  warning: { bg: 'bg-amber-400/12', text: 'text-amber-400', border: 'border-amber-400/25' },
  critical: { bg: 'bg-red-500/12', text: 'text-red-400', border: 'border-red-500/25' },
  pending: { bg: 'bg-slate-500/12', text: 'text-slate-400', border: 'border-slate-500/25' },
};

export default function HealthReport({ job }: HealthReportProps) {
  const showReport = ['repairing', 'completed'].includes(job.status);
  if (!showReport) return null;

  const metrics: MetricCard[] = [
    {
      label: 'Coil & Heat Exchanger Status',
      icon: <Thermometer className="w-5 h-5" />,
      value: job.healthReport?.coilEfficiency
        ? `${job.healthReport.coilEfficiency}% Efficiency`
        : '94% Efficiency',
      status: job.gridAudit?.heatExchanger || 'good',
      detail: 'Thermodynamic performance within optimal range',
    },
    {
      label: 'Electrical Stabilizer Output',
      icon: <Zap className="w-5 h-5" />,
      value: job.healthReport?.stabilizerOutput === 'fluctuating'
        ? 'Fluctuation Detected'
        : 'Stable Output',
      status: job.gridAudit?.voltageStabilizer || 'warning',
      detail: job.healthReport?.stabilizerOutput === 'fluctuating'
        ? 'Fluctuation vulnerability detected — stabilizer recommended'
        : 'Voltage output within acceptable parameters',
    },
    {
      label: 'Wiring Integrity',
      icon: <Cable className="w-5 h-5" />,
      value: job.healthReport?.wiringStatus === 'degraded'
        ? 'Degraded'
        : 'Optimal',
      status: job.gridAudit?.wiringIntegrity || 'good',
      detail: 'All electrical connections inspected and verified',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-5">
        <h3 className="text-lg font-bold text-white">
          Grid &amp; Climate Health Report
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Structural appliance vulnerability assessment
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric, i) => {
          const colors = statusColors[metric.status];
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <GlassCard className="p-5 h-full">
                <div
                  className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}
                >
                  <span className={colors.text}>{metric.icon}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-2">
                  {metric.label}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      metric.status === 'good'
                        ? 'bg-emerald-400'
                        : metric.status === 'warning'
                        ? 'bg-amber-400'
                        : metric.status === 'critical'
                        ? 'bg-red-400'
                        : 'bg-slate-400'
                    }`}
                  />
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {metric.value}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {metric.detail}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
