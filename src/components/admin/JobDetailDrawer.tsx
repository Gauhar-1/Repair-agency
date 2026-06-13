import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, AirVent, Refrigerator, Calendar, UserPlus, Share2 } from 'lucide-react';
import { JobData, getWhatsAppLink } from './shared';

interface Props {
  selectedJob: JobData | null;
  onClose: () => void;
  updateJob: (args: { id: string; data: any }) => void;
  isUpdating: boolean;
}

export function JobDetailDrawer({ selectedJob, onClose, updateJob, isUpdating }: Props) {
  return (
    <AnimatePresence>
      {selectedJob && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090A0B]/80 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#090A0B] border-l border-[#1F2227] z-50 shadow-2xl flex flex-col overflow-y-auto"
          >
            <div className="sticky top-0 bg-[#090A0B]/90 backdrop-blur-md border-b border-[#1F2227] px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-white">Job Details</h2>
              <button onClick={onClose} className="p-2 bg-[#121417] hover:bg-[#1F2227] rounded-sm text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedJob.booking && (
              <div className="p-6 space-y-8">
                
                <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-5">
                  <h3 className="text-xs font-bold text-[#479BFF] uppercase tracking-widest mb-4">Customer Information</h3>
                  <div className="space-y-4 text-sm text-slate-300">
                    <div>
                      <p className="text-white font-bold text-lg">{selectedJob.booking.customer.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <span className="font-mono">{selectedJob.booking.customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                      <span className="leading-snug">{selectedJob.booking.customer.address}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-5">
                  <h3 className="text-xs font-bold text-[#479BFF] uppercase tracking-widest mb-4">Service Request</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {selectedJob.booking.appliance === 'ac' ? <AirVent className="w-5 h-5 text-white" /> : <Refrigerator className="w-5 h-5 text-white" />}
                    <span className="text-base font-bold text-white uppercase">{selectedJob.booking.appliance === 'ac' ? 'AC Unit' : 'Refrigerator'}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Reported Issues:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.booking.issues.map(issue => (
                        <span key={issue} className="px-2.5 py-1 bg-[#1F2227] text-slate-300 rounded-sm text-xs capitalize">
                          {issue.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1F2227]">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-mono text-slate-300">
                      {selectedJob.booking.scheduledDate} • {selectedJob.booking.timeSlot}
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#121417] to-[#121417]/50 border border-[#479BFF]/30 rounded-sm p-5 shadow-[0_0_15px_rgba(71,155,255,0.05)]">
                  <h3 className="text-xs font-bold text-[#479BFF] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Technician Assignment
                  </h3>
                  
                  {selectedJob.assignedTechnician ? (
                    <div className="flex items-center justify-between bg-[#090A0B] p-3 border border-[#1F2227] rounded-sm">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Assigned To</p>
                        <p className="text-base font-bold text-white mt-1">{selectedJob.assignedTechnician}</p>
                      </div>
                      <button className="text-xs text-[#479BFF] hover:text-white transition-colors underline">Change</button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-400">Select a technician to dispatch to this location. The customer will be notified.</p>
                      <select id="tech-select" className="w-full p-3 bg-[#090A0B] border border-[#1F2227] rounded-sm text-white text-sm focus:border-[#479BFF] focus:outline-none cursor-pointer">
                        <option value="">-- Select Technician --</option>
                        <option value="rahul">Rahul (Senior HVAC)</option>
                        <option value="bikram">Bikram (Refrigeration)</option>
                        <option value="joy">Joy (Electrical/PCB)</option>
                      </select>
                      <button 
                        onClick={() => {
                          const val = (document.getElementById('tech-select') as HTMLSelectElement).value;
                          if (val) {
                            updateJob({ id: selectedJob._id, data: { status: 'assigned' } as any });
                          }
                        }}
                        disabled={isUpdating}
                        className="w-full py-3 bg-[#0062FF] hover:bg-[#479BFF] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors mt-2 disabled:opacity-50"
                      >
                        Assign & Notify Customer
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-[#121417] border border-[#1F2227] rounded-sm p-5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Update Job Status</h3>
                  <select 
                    value={selectedJob.status}
                    onChange={(e) => updateJob({ id: selectedJob._id, data: { status: e.target.value as any } })}
                    disabled={isUpdating}
                    className="w-full p-3 bg-[#090A0B] border border-[#1F2227] rounded-sm text-white text-sm focus:border-[#479BFF] focus:outline-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="assigned">Technician Assigned</option>
                    <option value="en_route">On The Way</option>
                    <option value="diagnosing">Diagnosing</option>
                    <option value="repairing">Repair Active</option>
                    <option value="completed">Mark as Completed</option>
                  </select>
                </div>

                <a
                  href={getWhatsAppLink(selectedJob.booking.customer.phone, selectedJob.booking.trackingUuid)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold uppercase tracking-widest hover:bg-[#25D366]/20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Resend Tracking Link via WhatsApp
                </a>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
