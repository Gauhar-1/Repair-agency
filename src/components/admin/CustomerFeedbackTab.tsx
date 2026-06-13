import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { LoadingState, EmptyState, StatCard } from './shared';

export interface FeedbackEntry {
  _id: string;
  jobId: string;
  bookingId: string;
  rating: number;
  comment: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export function FeedbackTab({ feedbacks, loading }: { feedbacks: FeedbackEntry[]; loading: boolean }) {
  if (loading) return <LoadingState label="Loading customer reviews" />;
  if (!feedbacks.length) return <EmptyState label="No reviews yet" sublabel="Feedback appears after jobs are completed" />;

  return (
    <div className="space-y-4">
      {/* Stat Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label="Total Reviews" value={feedbacks.length.toString()} accent="text-[#479BFF]" />
        <StatCard label="Avg Rating" value={(feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)} accent="text-amber-400" />
        <StatCard label="5-Star" value={feedbacks.filter(f => f.rating === 5).length.toString()} accent="text-[#00A650]" />
        <StatCard label="Needs Attention" value={feedbacks.filter(f => f.rating <= 3).length.toString()} accent="text-[#FF5E00]" />
      </div>

      {feedbacks.map((fb, i) => (
        <motion.div
          key={fb._id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="bg-[#121417] border border-[#1F2227] rounded-sm p-5 sm:p-6"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-base font-bold text-white">{fb.customerName}</h3>
              <p className="text-xs font-mono text-slate-500">{fb.customerPhone}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < fb.rating ? 'text-amber-400 fill-amber-400' : 'text-[#1F2227]'}`} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-slate-500">{new Date(fb.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          {fb.comment && (
            <p className="text-sm text-slate-300 bg-[#090A0B] border border-[#1F2227] rounded-sm p-4 leading-relaxed">
              &ldquo;{fb.comment}&rdquo;
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
