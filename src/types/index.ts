// ============================================
// ArcticEdge Repair Agency — Type Definitions
// ============================================

export type ApplianceType = 'ac' | 'refrigerator';

export type IssueType =
  | 'cooling_failure'
  | 'abnormal_noise'
  | 'water_leakage'
  | 'periodic_maintenance';

export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'en_route'
  | 'diagnosing'
  | 'repairing'
  | 'completed';

export type JobStatus =
  | 'assigned'
  | 'en_route'
  | 'diagnosing'
  | 'repairing'
  | 'completed';

export type AuditStatus = 'good' | 'warning' | 'critical';

export type WarrantyClaimStatus = 'requested' | 'dispatched' | 'resolved';

// --- Customer ---
export interface Customer {
  name: string;
  phone: string;
  address: string;
}

// --- Booking ---
export interface IBooking {
  _id: string;
  trackingUuid: string;
  appliance: ApplianceType;
  issues: IssueType[];
  scheduledDate: string;
  timeSlot: TimeSlot;
  customer: Customer;
  status: BookingStatus;
  assignedTechnicianId: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Job ---
export interface JobMedia {
  beforePhoto: string | null;
  diagnosticVideo: string | null;
  afterPhoto: string | null;
}

export interface GridAudit {
  heatExchanger: AuditStatus | null;
  voltageStabilizer: AuditStatus | null;
  wiringIntegrity: AuditStatus | null;
}

export interface HealthReport {
  coilEfficiency: number | null;
  stabilizerOutput: 'stable' | 'fluctuating' | null;
  wiringStatus: 'optimal' | 'degraded' | null;
}

export interface JobWarranty {
  active: boolean;
  activatedAt: string | null;
  expiresAt: string | null;
}

export interface IJob {
  _id: string;
  bookingId: string | IBooking;
  technicianId: string | ITechnician;
  status: JobStatus;
  media: JobMedia;
  gridAudit: GridAudit;
  healthReport: HealthReport;
  warranty: JobWarranty;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- Technician ---
export interface ITechnician {
  _id: string;
  name: string;
  photo: string;
  experience: string;
  specializations: string[];
  verified: boolean;
  rating: number;
  createdAt: string;
}

// --- Service ---
export interface IService {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  badge: string | null;
  highlighted: boolean;
  features: string[];
  waiverNote: string | null;
}

// --- Warranty Claim ---
export interface IWarrantyClaim {
  _id: string;
  jobId: string;
  bookingId: string;
  reason: string;
  status: WarrantyClaimStatus;
  createdAt: string;
}

// --- API Payloads ---
export interface CreateBookingPayload {
  appliance: ApplianceType;
  issues: IssueType[];
  scheduledDate: string;
  timeSlot: TimeSlot;
  customer: Customer;
}

export interface CreateBookingResponse {
  trackingUuid: string;
  bookingId: string;
}

export interface UpdateJobPayload {
  status?: JobStatus;
  media?: Partial<JobMedia>;
  gridAudit?: Partial<GridAudit>;
  healthReport?: Partial<HealthReport>;
}

export interface IFeedback {
  _id: string;
  jobId: string;
  bookingId: string;
  rating: number;
  comment: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export interface CreateFeedbackPayload {
  jobId: string;
  bookingId: string;
  rating: number;
  comment: string;
  customerName: string;
  customerPhone: string;
}

export interface TrackingData {
  booking: IBooking;
  job: IJob | null;
  technician: ITechnician | null;
  feedback: IFeedback | null;
}

export interface CreateWarrantyClaimPayload {
  jobId: string;
  bookingId: string;
  reason: string;
}

// --- Booking Step Form ---
export interface BookingFormData {
  appliance: ApplianceType | null;
  issues: IssueType[];
  scheduledDate: string | null;
  timeSlot: TimeSlot | null;
  customer: Customer;
}

// --- Issue Label Map ---
export const ISSUE_LABELS: Record<IssueType, string> = {
  cooling_failure: 'Cooling Failure',
  abnormal_noise: 'Abnormal Noise',
  water_leakage: 'Water Leakage',
  periodic_maintenance: 'Periodic Maintenance Jet Clean',
};

// --- Status Label Map ---
export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'Booking Received',
  confirmed: 'Booking Confirmed',
  assigned: 'Technician Assigned',
  en_route: 'Technician En Route',
  diagnosing: 'Live On-Site Diagnosis',
  repairing: 'Repair Active',
  completed: 'Completed & Warranty Active',
};

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  assigned: 'Assigned',
  en_route: 'Technician En Route',
  diagnosing: 'Live On-Site Diagnosis',
  repairing: 'Repair Active',
  completed: 'Completed & Warranty Active',
};
