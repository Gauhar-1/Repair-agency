import { ReactNode } from 'react';
import { Clock, UserPlus, Truck, Search, Wrench, CheckCircle2, ShieldAlert } from 'lucide-react';

export type TabId = 'ongoing' | 'completed' | 'feedback' | 'warranty';

export interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface JobData {
  _id: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
  assignedTechnician?: string | null;
  warranty: { active: boolean; activatedAt: string | null; expiresAt: string | null };
  booking: {
    _id: string;
    trackingUuid: string;
    appliance: string;
    issues: string[];
    scheduledDate: string;
    timeSlot: string;
    customer: { name: string; phone: string; address: string };
    status: string;
  } | null;
}

export function timeElapsed(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  const days = Math.floor(hrs / 24);
  return `${days}d ${hrs % 24}h`;
}

export function getWhatsAppLink(phone: string, trackingUuid: string): string {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const finalPhone = cleanPhone.startsWith('91') && cleanPhone.length === 12 ? cleanPhone : `91${cleanPhone.replace(/^\+/, '')}`;
  const trackingUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/track/${trackingUuid}`;
  const message = `ArcticEdge Update: Access your live service tracking and warranty dashboard here: ${trackingUrl}`;
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
}

export const statusDisplay: Record<string, { label: string; color: string; icon: ReactNode }> = {
  assigned:   { label: 'TECHNICIAN ASSIGNED', color: 'text-[#479BFF] bg-[#479BFF]/10 border-[#479BFF]/30', icon: <UserPlus className="w-3 h-3" /> },
  en_route:   { label: 'ON THE WAY', color: 'text-[#FF5E00] bg-[#FF5E00]/10 border-[#FF5E00]/30', icon: <Truck className="w-3 h-3" /> },
  diagnosing: { label: 'DIAGNOSING', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30', icon: <Search className="w-3 h-3" /> },
  repairing:  { label: 'REPAIRING', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/30', icon: <Wrench className="w-3 h-3" /> },
  completed:  { label: 'COMPLETED', color: 'text-[#00A650] bg-[#00A650]/10 border-[#00A650]/30', icon: <CheckCircle2 className="w-3 h-3" /> },
};

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-12 h-12 border-2 border-[#479BFF] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-mono text-[#479BFF] uppercase tracking-[0.2em] animate-pulse">{label}</p>
    </div>
  );
}

export function EmptyState({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <ShieldAlert className="w-12 h-12 text-[#1F2227] mb-4" />
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xs text-slate-600 mt-2">{sublabel}</p>
    </div>
  );
}

export function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-4 text-center">
      <p className={`text-2xl sm:text-3xl font-extrabold ${accent} font-mono`}>{value}</p>
      <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
}
