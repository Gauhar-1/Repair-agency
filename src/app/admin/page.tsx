'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, CheckCircle2, MessageSquare } from 'lucide-react';
import { useActiveJobs, useCompletedJobs, useFeedback, useWarrantyClaims, useUpdateJob } from '@/hooks/useAdminDashboard';

import { TabId, TabConfig } from '@/components/admin/shared';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { OngoingTab } from '@/components/admin/OngoingJobsTab';
import { CompletedTab } from '@/components/admin/CompletedJobsTab';
import { FeedbackTab } from '@/components/admin/CustomerFeedbackTab';
import { WarrantyClaimsTab } from '@/components/admin/WarrantyClaimsTab';
import { JobDetailDrawer } from '@/components/admin/JobDetailDrawer';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('ongoing');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { data: activeData, isLoading: activeLoading } = useActiveJobs();
  const { data: completedData, isLoading: completedLoading } = useCompletedJobs();
  const { data: feedbackData, isLoading: feedbackLoading } = useFeedback();
  const { data: warrantyData, isLoading: warrantyLoading } = useWarrantyClaims();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    const allJobs = [...(activeData?.jobs || []), ...(completedData?.jobs || [])];
    return allJobs.find(j => j._id === selectedJobId) || null;
  }, [selectedJobId, activeData, completedData]);

  const tabs: TabConfig[] = useMemo(() => [
    { id: 'ongoing', label: 'Active Jobs', icon: <Radio className="w-4 h-4" />, badge: activeData?.jobs?.length || 0 },
    { id: 'completed', label: 'Completed Jobs', icon: <CheckCircle2 className="w-4 h-4" />, badge: completedData?.jobs?.length || 0 },
    { id: 'feedback', label: 'Customer Reviews', icon: <MessageSquare className="w-4 h-4" />, badge: feedbackData?.feedbacks?.length || 0 },
    { id: 'warranty', label: 'Warranty Claims', icon: <CheckCircle2 className="w-4 h-4" />, badge: warrantyData?.claims?.length || 0 },
  ], [activeData, completedData, feedbackData, warrantyData]);

  return (
    <main className="min-h-screen bg-[#090A0B] text-slate-300 font-sans pb-24 selection:bg-[#479BFF]/30 overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none" />

      <AdminHeader />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-6">
        
        {/* TABS */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-sm border text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#479BFF]/10 border-[#479BFF]/50 text-[#479BFF] shadow-[0_0_20px_rgba(71,155,255,0.15)]'
                  : 'bg-[#121417] border-[#1F2227] text-slate-500 hover:text-slate-300 hover:border-[#2D3139]'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold ${activeTab === tab.id ? 'bg-[#479BFF]/20 text-[#479BFF]' : 'bg-[#1F2227] text-slate-500'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'ongoing' && (
            <motion.div key="ongoing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <OngoingTab jobs={activeData?.jobs || []} loading={activeLoading} onSelectJob={(job) => setSelectedJobId(job._id)} />
            </motion.div>
          )}
          {activeTab === 'completed' && (
            <motion.div key="completed" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <CompletedTab jobs={completedData?.jobs || []} loading={completedLoading} onSelectJob={(job) => setSelectedJobId(job._id)} />
            </motion.div>
          )}
          {activeTab === 'feedback' && (
            <motion.div key="feedback" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <FeedbackTab feedbacks={feedbackData?.feedbacks || []} loading={feedbackLoading} />
            </motion.div>
          )}
          {activeTab === 'warranty' && (
            <motion.div key="warranty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <WarrantyClaimsTab claims={warrantyData?.claims || []} loading={warrantyLoading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <JobDetailDrawer 
        selectedJob={selectedJob as any} 
        onClose={() => setSelectedJobId(null)} 
        updateJob={updateJob} 
        isUpdating={isUpdating} 
      />
    </main>
  );
}