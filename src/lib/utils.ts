import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names — thin wrapper for consistency.
 * We keep it simple and avoid twMerge since Tailwind v4
 * handles specificity well with the new @layer system.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a price in INR currency.
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate the next N calendar dates starting from today.
 */
export function getNextDates(count: number): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

/**
 * Format a date to a human-readable short form.
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate days remaining until a target date.
 */
export function daysRemaining(targetDate: string | Date): number {
  const target = new Date(targetDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Calculate progress percentage for warranty (30 days).
 */
export function warrantyProgress(activatedAt: string | Date): number {
  const start = new Date(activatedAt).getTime();
  const end = start + 30 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  if (now >= end) return 0;
  if (now <= start) return 100;
  return Math.round(((end - now) / (end - start)) * 100);
}
