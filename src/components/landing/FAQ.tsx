'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I know if my system actually requires a refrigerant recharge?',
    answer:
      "We enforce visual validation. Our technicians upload real-time video evidence of a bubbling leak to your live digital tracking workspace before billing or initiating a recharge. If we can't produce video proof of a leak, you are never charged for refrigerant — period. This is our Zero-Fraud Guarantee.",
  },
  {
    question: 'How does the 30-Day Un-erasable Warranty function?',
    answer:
      'Once a job ticket shifts to "Completed" status, a digital smart clock goes live inside your tracking dashboard. The 30-day countdown is visible, tamper-proof, and cannot be manually overridden. If any performance fault occurs within 30 days related to the original service, trigger a 1-click callback request for an immediate free emergency dispatch — no forms, no questions, no charges.',
  },
  {
    question: 'Are there any hidden overheads or visiting fees?',
    answer:
      'No. Our diagnostic reservation fee of ₹199 covers the initial on-site Smart Grid & Climate Diagnostic. If you authorize the repair and proceed, this fee is completely waived — it gets absorbed into the service cost. For Annual Pass (AMC) subscribers, all visiting charges are permanently waived for 12 months.',
  },
  {
    question: 'Why should I choose ArcticEdge over Urban Company or local mechanics?',
    answer:
      "Three structural differences: (1) We employ full-time, salaried W-2 technicians — not random gig-economy freelancers. The same expert services your home every time. (2) We provide video proof before any billable work — no other service in Guwahati does this. (3) Our workflows are engineered specifically for Assam's high-humidity, unstable-grid environment, not copy-pasted from Bangalore SOPs.",
  },
  {
    question: 'What happens if my appliance breaks down again after service?',
    answer:
      'Your 30-Day Un-erasable Digital Warranty covers you completely. Hit the "Emergency Warranty Claim" button on your tracking page, and we guarantee a return dispatch within 2 hours for AMC subscribers, or same-day for standard bookings. The return visit, diagnosis, and any related repair labor are fully covered at zero additional cost.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#090A0B] border-[#1F2227] overflow-hidden" id="faq">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==========================================
            SECTION HEADER
            ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-left mb-16 lg:mb-20 flex flex-col items-start"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 bg-[#121417] border border-[#1F2227] rounded-sm flex items-center justify-center shadow-inner">
              <HelpCircle className="w-4 h-4 text-[#479BFF]" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#479BFF]">
              Operational Protocols
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-50 mb-6 leading-[1.05]">
            Clear Answers. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#479BFF] to-[#0062FF] font-serif italic font-light tracking-normal">Absolute Transparency.</span>
          </h2>

          <p className="max-w-2xl text-lg text-slate-400 border-l-2 border-[#1F2227] pl-4">
            Every question you'd want answered before trusting an engineering firm with your high-value home appliances.
          </p>
        </motion.div>

        {/* ==========================================
            ACCORDION LIST
            ========================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-3 sm:space-y-4"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`group relative rounded-sm border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? 'border-[#479BFF]/30 bg-[#121417] shadow-[0_10px_30px_rgba(0,98,255,0.05)]'
                    : 'border-[#1F2227] bg-[#090A0B] hover:border-[#2D3139] hover:bg-[#121417]/50'
                }`}
              >
                {/* Active Left-Edge Indicator Line */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-[#479BFF] transition-transform duration-500 origin-top ${
                    isOpen ? 'scale-y-100' : 'scale-y-0'
                  }`} 
                />

                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-8 text-left cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 lg:gap-8">
                    
                    {/* Monospace Numbering */}
                    <span
                      className={`shrink-0 font-mono text-sm sm:text-base font-bold tracking-widest transition-colors duration-300 mt-0.5 sm:mt-0 ${
                        isOpen ? 'text-[#479BFF]' : 'text-slate-600 group-hover:text-slate-400'
                      }`}
                    >
                      [ {String(i + 1).padStart(2, '0')} ]
                    </span>

                    {/* Question Text */}
                    <span
                      className={`flex-1 text-base sm:text-lg font-bold transition-colors duration-300 leading-snug ${
                        isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Mechanical Toggle Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-sm border flex items-center justify-center transition-colors duration-300 ${
                      isOpen 
                        ? 'bg-[#479BFF]/10 border-[#479BFF]/30 text-[#479BFF]' 
                        : 'bg-[#121417] border-[#1F2227] text-slate-500 group-hover:border-[#2D3139] group-hover:text-slate-300'
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Snappy, premium easing
                    >
                      <div className="px-5 sm:px-6 lg:px-8 pb-6 lg:pb-8 pt-2">
                        <div className="pl-0 sm:pl-[4.5rem] lg:pl-[5.5rem]">
                          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}