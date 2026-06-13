// ============================================
// ArcticEdge Repair Agency — App Constants
// ============================================

export const APP_NAME = 'ArcticEdge';
export const APP_TAGLINE = 'Premium AC & Refrigerator Engineering';
export const APP_DISTRICT = 'Guwahati';

export const TIME_SLOTS = [
  { id: 'morning' as const, label: 'Morning', time: '8 AM – 12 PM', icon: '🌅' },
  { id: 'afternoon' as const, label: 'Afternoon', time: '12 PM – 4 PM', icon: '☀️' },
  { id: 'evening' as const, label: 'Evening', time: '4 PM – 8 PM', icon: '🌆' },
];

export const TIMELINE_STEPS = [
  { status: 'confirmed', label: 'Booking Confirmed', description: 'Your service request has been confirmed' },
  { status: 'en_route', label: 'Technician En Route', description: 'Your assigned expert is on the way' },
  { status: 'diagnosing', label: 'Live On-Site Diagnosis', description: 'Performing systematic diagnostics' },
  { status: 'repairing', label: 'Repair Active', description: 'Expert repair in progress' },
  { status: 'completed', label: 'Completed & Warranty Active', description: 'Service complete — 30-day warranty activated' },
] as const;

export const TECH_STATUS_ACTIONS = [
  { fromStatus: 'assigned', toStatus: 'en_route', label: 'Start Route', color: 'teal' },
  { fromStatus: 'en_route', toStatus: 'diagnosing', label: 'Start Diagnosis', color: 'teal' },
  { fromStatus: 'diagnosing', toStatus: 'repairing', label: 'Begin Repair', color: 'amber' },
  { fromStatus: 'repairing', toStatus: 'completed', label: 'Mark Completed', color: 'emerald' },
] as const;

export const WARRANTY_DAYS = 30;
