import { motion } from 'framer-motion';
import { Phone, AirVent, Refrigerator, Clock, ChevronRight } from 'lucide-react';
import { JobData, LoadingState, EmptyState, statusDisplay, timeElapsed } from './shared';

export function OngoingTab({ jobs, loading, onSelectJob }: { jobs: JobData[]; loading: boolean; onSelectJob: (job: JobData) => void }) {
  if (loading) return <LoadingState label="Loading active jobs" />;
  if (!jobs.length) return <EmptyState label="No active jobs" sublabel="All operations completed" />;

  return (
    <div className="space-y-3">
      {jobs.map((job, i) => {
        if (!job.booking) return null;
        const b = job.booking;
        const sd = statusDisplay[job.status] || statusDisplay.assigned;

        return (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            onClick={() => onSelectJob(job)}
            className="group bg-[#121417] border border-[#1F2227] rounded-sm p-5 sm:p-6 hover:border-[#479BFF]/50 hover:bg-[#121417]/80 cursor-pointer transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#479BFF] transition-colors">{b.customer.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${sd.color}`}>
                    {sd.icon} {sd.label}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> <span className="font-mono text-xs">{b.customer.phone}</span></span>
                  <span className="flex items-center gap-1.5">
                    {b.appliance === 'ac' ? <AirVent className="w-3.5 h-3.5" /> : <Refrigerator className="w-3.5 h-3.5" />}
                    {b.appliance === 'ac' ? 'AC Unit' : 'Fridge'}
                  </span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Waiting: {timeElapsed(job.createdAt)}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#1F2227]">
                {!job.assignedTechnician && (
                  <span className="px-3 py-1 bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/30 rounded-sm text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    Needs Technician
                  </span>
                )}
                <div className="flex items-center gap-2 text-[#479BFF] text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  View Details <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
