'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ShieldAlert, Activity, ShieldCheck, Radar,
  CheckCircle2, Lock, Unlock, Wrench, AirVent, Refrigerator
} from 'lucide-react';
import Link from 'next/link';
import { useTracking } from '@/hooks/useTracking';
import { useQueryClient } from '@tanstack/react-query';
import JobTimeline from '@/components/tracking/JobTimeline';
import TechnicianCard from '@/components/tracking/TechnicianCard';
import WarrantyClock from '@/components/tracking/WarrantyClock';
import FeedbackGate from '@/components/tracking/FeedbackGate';
import StatusBadge from '@/components/ui/StatusBadge';
import { APP_NAME } from '@/lib/constants';
import type { BookingStatus } from '@/types';

export default function TrackingPage() {
  const params = useParams();
  const uuid = params.uuid as string;
  const { data, isLoading, isError } = useTracking(uuid);
  const queryClient = useQueryClient();

  // Local state: has the user just submitted feedback in this session?
  const [justSubmittedFeedback, setJustSubmittedFeedback] = useState(false);

  const handleFeedbackSubmitted = useCallback(() => {
    setJustSubmittedFeedback(true);
    // Refetch tracking data to get updated warranty info
    queryClient.invalidateQueries({ queryKey: ['tracking', uuid] });
  }, [queryClient, uuid]);

  // ==========================================
  // LOADING STATE
  // ==========================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090A0B] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-t-2 border-[#479BFF] animate-spin" />
            <div className="absolute inset-2 rounded-full border-r-2 border-[#0062FF] animate-[spin_1.5s_linear_reverse_infinite]" />
            <Radar className="w-5 h-5 text-[#479BFF] animate-pulse" />
          </div>
          <p className="text-[10px] font-mono text-[#479BFF] uppercase tracking-[0.2em] animate-pulse">
            Locating Service Record...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR STATE
  // ==========================================
  if (isError || !data?.booking) {
    return (
      <div className="min-h-screen bg-[#090A0B] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative z-10 text-center max-w-md bg-[#121417] border border-[#FF5E00]/30 p-8 rounded-sm shadow-[0_0_40px_rgba(255,94,0,0.1)]">
          <ShieldAlert className="w-12 h-12 text-[#FF5E00] mx-auto mb-6" />
          <h2 className="text-xl font-bold text-slate-50 mb-2 uppercase tracking-widest">
            Tracking Link Invalid
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            The tracking ID <span className="font-mono text-slate-300">[{uuid.slice(0,8)}]</span> is invalid or expired. Please check the WhatsApp message sent to you by our admin.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-4 rounded-sm bg-[#1F2227] hover:bg-[#2D3139] border border-[#2D3139] hover:border-[#FF5E00]/50 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { booking, job, technician, feedback } = data;

  // ==========================================
  // CORE LOGIC (The 3 Stages)
  // ==========================================
  const isCompleted = booking.status === 'completed';
  const hasFeedback = !!feedback || justSubmittedFeedback;
  const warrantyActive = job?.warranty?.active === true;

  return (
    <main className="min-h-screen bg-[#090A0B] text-slate-300 pb-24 selection:bg-[#479BFF]/30">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none fixed" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none fixed" />

      {/* ==========================================
          HEADER
          ========================================== */}
      <header className="sticky top-0 z-50 bg-[#090A0B]/90 backdrop-blur-xl border-b border-[#1F2227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center shadow-inner">
              <span className="text-[#479BFF] font-extrabold text-sm">AE</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-white block leading-none tracking-wide">{APP_NAME}</span>
              <span className="text-[9px] font-mono text-[#479BFF] uppercase tracking-widest mt-0.5 block">Customer Tracking</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#121417] border border-[#1F2227] rounded-sm hidden sm:flex">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A650] opacity-75" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#00A650]" />
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
            </div>
            <StatusBadge status={booking.status as BookingStatus} />
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN DASHBOARD CONTENT
          ========================================== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Service Details Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#121417] border border-[#1F2227] rounded-sm p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#479BFF]/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-4 h-4 text-[#479BFF]" />
            <span className="text-[10px] font-mono font-bold text-[#479BFF] uppercase tracking-widest">
              {isCompleted && hasFeedback ? 'Service Completed & Warranty Active' : 
               isCompleted ? 'Service Complete — Action Required' : 
               'Active Service Details'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-50 mb-4 tracking-tight">
            Hello, {booking.customer?.name?.split(' ')[0] || 'Customer'}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#090A0B] border border-[#1F2227] rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Tracking ID:</span>
              <span className="text-xs font-mono text-slate-300">{uuid.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#090A0B] border border-[#1F2227] rounded-sm">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Appliance:</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-100 uppercase tracking-wider">
                {booking.appliance === 'ac' ? <AirVent className="w-3.5 h-3.5" /> : <Refrigerator className="w-3.5 h-3.5" />}
                {booking.appliance === 'ac' ? 'Air Conditioner' : 'Refrigerator'}
              </span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* ==========================================
              STAGE 1: PRE-COMPLETION VIEW
              ========================================== */}
          {!isCompleted && (
            <motion.div key="stage-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 border-b border-[#1F2227] pb-4 mb-6">
                  <Activity className="w-4 h-4 text-slate-500" />
                  <h2 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                    Live Progress Timeline
                  </h2>
                </div>
                <JobTimeline currentStatus={booking.status as BookingStatus} />
              </div>

              {technician && (
                <TechnicianCard technician={technician} />
              )}
            </motion.div>
          )}

          {/* ==========================================
              STAGE 2: THE FEEDBACK GATE (Locked Warranty)
              ========================================== */}
          {isCompleted && !hasFeedback && job && (
            <motion.div 
              key="stage-2" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="relative rounded-sm border border-[#FF5E00]/40 bg-gradient-to-b from-[#FF5E00]/10 to-[#121417] p-1 overflow-hidden"
            >
              {/* Warning Stripes Background */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#FF5E00,#FF5E00_10px,transparent_10px,transparent_20px)] opacity-50" />
              
              <div className="bg-[#121417] p-6 sm:p-8 rounded-sm text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#FF5E00]/10 border border-[#FF5E00]/30 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-[#FF5E00]" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Service Complete.</h2>
                <p className="text-sm text-slate-300 mb-8 max-w-md mx-auto">
                  To activate your 30-Day Digital Warranty, please submit your verified field rating for the technician.
                </p>

                {/* Render the Feedback Form */}
                <div className="max-w-md mx-auto text-left">
                  <FeedbackGate
                    booking={booking}
                    job={job}
                    onFeedbackSubmitted={handleFeedbackSubmitted}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              STAGE 3: WARRANTY DASHBOARD (Unlocked)
              ========================================== */}
          {isCompleted && hasFeedback && (
            <motion.div key="stage-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              
              <div className="bg-[#00A650]/5 border border-[#00A650]/30 rounded-sm p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00A650]/10 to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-sm bg-[#00A650] shadow-[0_0_20px_rgba(0,166,80,0.4)] flex items-center justify-center shrink-0">
                    <Unlock className="w-6 h-6 text-[#090A0B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                      Warranty Unlocked & Active
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Thank you for your feedback. Your appliance is now protected.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
                  <div className="bg-[#090A0B] border border-[#1F2227] rounded-sm p-4 text-center">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Technician</p>
                    <p className="text-sm font-bold text-white">{technician?.name || '—'}</p>
                  </div>
                  <div className="bg-[#090A0B] border border-[#1F2227] rounded-sm p-4 text-center">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-sm font-bold text-[#00A650] flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </p>
                  </div>
                  <div className="bg-[#090A0B] border border-[#1F2227] rounded-sm p-4 text-center col-span-2 sm:col-span-1">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Protection</p>
                    <p className="text-sm font-bold text-[#00A650]">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                      30 Days
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Warranty Countdown Clock */}
              {job && (warrantyActive || justSubmittedFeedback) && (
                <WarrantyClock job={job} bookingId={booking._id} />
              )}
            </motion.div>
          )}

        </AnimatePresence>

        {/* ==========================================
            FOOTER
            ========================================== */}
        <div className="text-center py-8 mt-8 border-t border-[#1F2227]">
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            Record ID: {uuid}
          </p>
        </div>

      </div>
    </main>
  );
}