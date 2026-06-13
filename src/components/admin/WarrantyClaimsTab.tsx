import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { LoadingState, EmptyState } from './shared';
import { WarrantyClaim } from '@/hooks/useAdminDashboard';

export function WarrantyClaimsTab({ claims, loading }: { claims: WarrantyClaim[]; loading: boolean }) {
  if (loading) return <LoadingState label="Loading warranty claims" />;
  if (!claims.length) return <EmptyState label="No warranty claims" sublabel="All systems are operating normally" />;

  const statusColors: Record<string, string> = {
    requested: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
    dispatched: 'text-[#479BFF] bg-[#479BFF]/10 border-[#479BFF]/30',
    resolved: 'text-[#00A650] bg-[#00A650]/10 border-[#00A650]/30',
  };

  return (
    <div className="space-y-4">
      {claims.map((claim, i) => {
        const b = claim.bookingId;
        const color = statusColors[claim.status] || statusColors.requested;

        return (
          <motion.div
            key={claim._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="group bg-[#121417] border border-[#1F2227] rounded-sm p-5 sm:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#479BFF] transition-colors">{b?.customer?.name || 'Unknown'}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm border ${color}`}>
                    {claim.status === 'resolved' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                    {claim.status}
                  </span>
                </div>
                
                <div className="text-sm text-slate-300 mb-4">
                  <p><strong className="text-slate-500 uppercase text-xs tracking-widest">Reason:</strong> {claim.reason}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5 font-mono text-xs"><Clock className="w-3.5 h-3.5" /> Claimed: {new Date(claim.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-[#479BFF]">Tracking UUID: {b?.trackingUuid}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#1F2227]">
                {claim.status === 'requested' && (
                  <button className="px-4 py-2 bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/30 hover:bg-[#FF5E00]/20 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors">
                    Dispatch Technician
                  </button>
                )}
                {claim.status === 'dispatched' && (
                  <button className="px-4 py-2 bg-[#00A650]/10 text-[#00A650] border border-[#00A650]/30 hover:bg-[#00A650]/20 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Mark Resolved
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
