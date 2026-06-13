import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateJobPayload, IFeedback } from '@/types';

interface JobWithBooking {
  _id: string;
  bookingId: string;
  technicianId: string;
  status: string;
  media: { beforePhoto: string | null; diagnosticVideo: string | null; afterPhoto: string | null };
  gridAudit: { heatExchanger: string | null; voltageStabilizer: string | null; wiringIntegrity: string | null };
  warranty: { active: boolean; activatedAt: string | null; expiresAt: string | null };
  completedAt: string | null;
  createdAt: string;
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

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---- Active (non-completed) jobs ----
async function fetchActiveJobs(): Promise<{ jobs: JobWithBooking[] }> {
  const res = await fetch('/api/jobs', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export function useActiveJobs() {
  return useQuery({
    queryKey: ['active-jobs'],
    queryFn: fetchActiveJobs,
    refetchInterval: 15000,
  });
}

// ---- Completed jobs ----
async function fetchCompletedJobs(): Promise<{ jobs: JobWithBooking[] }> {
  const res = await fetch('/api/jobs?status=completed', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch completed jobs');
  return res.json();
}

export function useCompletedJobs() {
  return useQuery({
    queryKey: ['completed-jobs'],
    queryFn: fetchCompletedJobs,
    refetchInterval: 30000,
  });
}

// ---- Feedback ----
async function fetchFeedback(): Promise<{ feedbacks: IFeedback[] }> {
  const res = await fetch('/api/feedback', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch feedback');
  return res.json();
}

export function useFeedback() {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
    refetchInterval: 30000,
  });
}

// ---- Update job (status, media, etc.) ----
async function updateJob(id: string, data: UpdateJobPayload) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update job');
  return res.json();
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJobPayload }) =>
      updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['active-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['completed-jobs'] });
    },
  });
}

// ---- Warranty Claims ----
export interface WarrantyClaim {
  _id: string;
  jobId: string;
  bookingId: {
    _id: string;
    trackingUuid: string;
    appliance: string;
    customer: { name: string; phone: string; address: string };
  };
  reason: string;
  status: string;
  createdAt: string;
}

async function fetchWarrantyClaims(): Promise<{ claims: WarrantyClaim[] }> {
  const res = await fetch('/api/warranty-claims', { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch warranty claims');
  return res.json();
}

export function useWarrantyClaims() {
  return useQuery({
    queryKey: ['warranty-claims'],
    queryFn: fetchWarrantyClaims,
    refetchInterval: 30000,
  });
}
