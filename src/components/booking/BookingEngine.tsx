'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Crosshair, Activity } from 'lucide-react';
import StepAppliance from './StepAppliance';
import StepDiagnostics from './StepDiagnostics';
import StepSchedule from './StepSchedule';
import StepContact from './StepContact';
import type {
  BookingFormData,
  ApplianceType,
  IssueType,
  TimeSlot,
  Customer,
  CreateBookingPayload,
  CreateBookingResponse,
} from '@/types';

const STEPS = ['Appliance', 'Diagnostics', 'Dispatch Slot', 'Authorization'];

async function createBooking(
  data: CreateBookingPayload
): Promise<CreateBookingResponse> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

export default function BookingEngine() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<BookingFormData>({
    appliance: null,
    issues: [],
    scheduledDate: null,
    timeSlot: null,
    customer: { name: '', phone: '', address: '' },
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      router.push(`/track/${data.trackingUuid}`);
    },
  });

  const canNext = (): boolean => {
    switch (step) {
      case 0:
        return form.appliance !== null;
      case 1:
        return form.issues.length > 0;
      case 2:
        return form.scheduledDate !== null && form.timeSlot !== null;
      case 3:
        return (
          form.customer.name.trim() !== '' &&
          form.customer.phone.trim().length >= 10 &&
          form.customer.address.trim() !== ''
        );
      default:
        return false;
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1 && canNext()) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!form.appliance || !form.scheduledDate || !form.timeSlot) return;
    mutation.mutate({
      appliance: form.appliance,
      issues: form.issues,
      scheduledDate: form.scheduledDate,
      timeSlot: form.timeSlot,
      customer: form.customer,
    });
  };

  const handleToggleIssue = (issue: IssueType) => {
    setForm((prev) => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter((i) => i !== issue)
        : [...prev.issues, issue],
    }));
  };

  const handleCustomerChange = (field: keyof Customer, value: string) => {
    setForm((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <section id="book" className="py-24 lg:py-32 relative bg-[#090A0B] border-t border-[#1F2227]">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* ==========================================
            HEADER
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-charcoal-900 border border-charcoal-700 mb-6 shadow-inner">
            <Crosshair className="w-3.5 h-3.5 text-aqua-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-aqua-400">
              Initialize Dispatch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-offwhite-50 mb-4">
            Deploy an <span className="text-gradient-aqua">Engineer.</span>
          </h2>
          <p className="text-offwhite-300 text-sm sm:text-base max-w-lg mx-auto">
            Complete the terminal sequence below to lock in your flat-rate diagnostic audit and secure your dispatch slot.
          </p>
        </motion.div>

        {/* ==========================================
            TERMINAL CONTAINER
            ========================================== */}
        <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm shadow-2xl relative overflow-hidden">
          
          {/* Terminal Top Bar (Aesthetic) */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-800 bg-charcoal-950/50">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-coral-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-aqua-500/80" />
            </div>
            <div className="flex items-center gap-2 text-offwhite-400">
              <Activity className="w-3 h-3" />
              <span className="text-[10px] font-mono tracking-widest uppercase">Secure Link</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="px-6 sm:px-10 pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((label, i) => (
                <div
                  key={label}
                  className={`flex flex-col gap-2 transition-colors duration-300 ${
                    i <= step ? 'text-aqua-400' : 'text-charcoal-600'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold tracking-widest">
                    [ 0{i + 1} ]
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${
                    i === step ? 'text-offwhite-50' : i < step ? 'text-offwhite-300' : 'text-charcoal-600'
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            {/* Structural Progress Line */}
            <div className="h-0.5 w-full bg-charcoal-800 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-aqua-400"
                initial={false}
                animate={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Dynamic Step Content */}
          <div className="p-6 sm:p-10 min-h-[380px] relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full"
              >
                {step === 0 && (
                  <StepAppliance
                    selected={form.appliance}
                    onSelect={(a: ApplianceType) =>
                      setForm((prev) => ({ ...prev, appliance: a }))
                    }
                  />
                )}
                {step === 1 && (
                  <StepDiagnostics
                    selected={form.issues}
                    onToggle={handleToggleIssue}
                  />
                )}
                {step === 2 && (
                  <StepSchedule
                    selectedDate={form.scheduledDate}
                    selectedSlot={form.timeSlot}
                    onDateSelect={(d: string) =>
                      setForm((prev) => ({ ...prev, scheduledDate: d }))
                    }
                    onSlotSelect={(s: TimeSlot) =>
                      setForm((prev) => ({ ...prev, timeSlot: s }))
                    }
                  />
                )}
                {step === 3 && (
                  <StepContact
                    customer={form.customer}
                    onChange={handleCustomerChange}
                    onSubmit={handleSubmit}
                    loading={mutation.isPending}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Terminal Footer Navigation */}
          <div className="px-6 sm:px-10 py-6 border-t border-charcoal-800 bg-charcoal-950/30">
            {step < 3 ? (
              <div className="flex justify-between items-center">
                <button
                  onClick={goBack}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-offwhite-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Abort
                </button>
                <button
                  onClick={goNext}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-6 py-3 bg-aqua-500 text-charcoal-950 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-aqua-400 transition-all disabled:opacity-50 disabled:bg-charcoal-800 disabled:text-offwhite-500 disabled:cursor-not-allowed"
                >
                  Proceed
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Step 3 handles its own submit button inside StepContact, 
              // but we can provide a back button here if needed.
              <div className="flex justify-start">
                 <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-offwhite-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Review Details
                </button>
              </div>
            )}
          </div>
          
        </div>

        {/* Error State */}
        <AnimatePresence>
          {mutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-4 border border-coral-500/30 bg-coral-500/10 rounded-sm text-center"
            >
              <p className="text-xs font-bold text-coral-400 uppercase tracking-widest">
                Transmission Error. Please verify connection and retry.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </section>
  );
}