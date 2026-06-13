'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Star, Lock, Send, Loader2 } from 'lucide-react';
import type { IBooking, IJob } from '@/types';

interface FeedbackGateProps {
  booking: IBooking;
  job: IJob;
  onFeedbackSubmitted: () => void;
}

export default function FeedbackGate({ booking, job, onFeedbackSubmitted }: FeedbackGateProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating to activate your warranty.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job._id,
          bookingId: booking._id,
          rating,
          comment,
          customerName: booking.customer?.name || 'Customer',
          customerPhone: booking.customer?.phone || '',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSuccess(true);

      // Delay before transitioning to warranty view
      setTimeout(() => {
        onFeedbackSubmitted();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {success ? (
          // ========== SUCCESS STATE ==========
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-[#00A650]/10 border-2 border-[#00A650]/30 flex items-center justify-center mx-auto mb-6"
            >
              <ShieldCheck className="w-10 h-10 text-[#00A650]" />
            </motion.div>
            <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
              Warranty Activated
            </h2>
            <p className="text-sm text-slate-400">
              Your 30-Day Digital Warranty is now live. Loading dashboard...
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-8 h-8 border-2 border-[#00A650] border-t-transparent rounded-full animate-spin" />
            </div>
          </motion.div>
        ) : (
          // ========== FEEDBACK FORM ==========
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            {/* Lock icon */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(71,155,255,0.1)]"
              >
                <Lock className="w-7 h-7 text-[#479BFF]" />
              </motion.div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-50 mb-3 tracking-tight">
                Service Complete
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                To activate your <span className="text-white font-bold">30-Day Digital Warranty</span>,
                please submit your verified field rating.
              </p>
            </div>

            {/* Rating form card */}
            <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#479BFF]/5 rounded-full blur-[40px] pointer-events-none" />

              {/* Star rating */}
              <div className="mb-6">
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Your Service Rating
                </label>
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const isActive = starValue <= (hoveredStar || rating);

                    return (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoveredStar(starValue)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => {
                          setRating(starValue);
                          setError(null);
                        }}
                        className="cursor-pointer p-1 transition-colors"
                      >
                        <Star
                          className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-200 ${
                            isActive
                              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                              : 'text-[#2D3139]'
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs font-mono text-amber-400 mt-2"
                  >
                    {rating === 5 ? 'Outstanding' : rating === 4 ? 'Excellent' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'} — {rating}/5
                  </motion.p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Comments (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with our technician..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#090A0B] border border-[#1F2227] rounded-sm text-sm text-slate-300 font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#479BFF]/50 focus:ring-1 focus:ring-[#479BFF]/20 resize-none transition-all"
                />
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#FF5E00] font-mono mb-4 text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmit}
                disabled={submitting}
                className={`
                  w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-sm
                  text-sm font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer
                  ${rating > 0
                    ? 'bg-[#479BFF] text-white shadow-[0_0_30px_rgba(71,155,255,0.3)] hover:shadow-[0_0_40px_rgba(71,155,255,0.5)]'
                    : 'bg-[#1F2227] text-slate-500 cursor-not-allowed'
                  }
                  disabled:opacity-60 disabled:cursor-not-allowed
                `}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Activating Warranty...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Rating & Activate Warranty
                  </>
                )}
              </motion.button>

              <p className="text-[10px] font-mono text-slate-600 text-center mt-4">
                Your feedback is encrypted and linked to service ID {job._id?.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
