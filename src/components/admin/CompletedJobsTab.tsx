import { motion } from 'framer-motion';
import { Phone, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { JobData, LoadingState, EmptyState } from './shared';

export function CompletedTab({ jobs, loading, onSelectJob }: { jobs: JobData[]; loading: boolean; onSelectJob: (job: JobData) => void }) {
  if (loading) return <LoadingState label="Loading completed jobs" />;
  if (!jobs.length) return <EmptyState label="No completed jobs" sublabel="Completed jobs will appear here" />;

  return (
    <div className="space-y-3">
      {jobs.map((job, i) => {
        if (!job.booking) return null;
        const b = job.booking;
        const warrantyLabel = job.warranty?.active ? 'Warranty Active' : 'Pending Feedback';
        const warrantyColor = job.warranty?.active ? 'text-[#00A650] border-[#00A650]/30 bg-[#00A650]/10' : 'text-amber-400 border-amber-400/30 bg-amber-400/10';

        return (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            onClick={() => onSelectJob(job)}
            className="group bg-[#121417] border border-[#1F2227] rounded-sm p-5 sm:p-6 hover:border-[#479BFF]/50 cursor-pointer transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#479BFF] transition-colors">{b.customer.name}</h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm border text-[#00A650] bg-[#00A650]/10 border-[#00A650]/30">
                    <CheckCircle2 className="w-3 h-3" /> Done
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${warrantyColor}`}>
                    {warrantyLabel}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5 font-mono text-xs"><Phone className="w-3.5 h-3.5" /> {b.customer.phone}</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5" /> 
                    {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#479BFF] text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                View Details <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
