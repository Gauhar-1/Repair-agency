'use client';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Lock } from 'lucide-react';
import type { Customer } from '@/types';

interface StepContactProps {
  customer: Customer;
  onChange: (field: keyof Customer, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function StepContact({
  customer,
  onChange,
  onSubmit,
  loading,
}: StepContactProps) {
  const isValid =
    customer.name.trim() !== '' &&
    customer.phone.trim().length >= 10 &&
    customer.address.trim() !== '';

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">
        Almost there!
      </h3>
      <p className="text-slate-400 text-sm mb-8">
        Enter your contact details so we can route your nearest available
        technician.
      </p>

      <div className="space-y-5">
        <Input
          label="Full Name"
          value={customer.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <Input
          label="Phone Number"
          type="tel"
          value={customer.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          maxLength={10}
        />
        <Input
          label="Service Address"
          value={customer.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>

      <div className="mt-8">
        <Button
          size="lg"
          className="w-full"
          onClick={onSubmit}
          disabled={!isValid}
          loading={loading}
        >
          <Lock className="w-4 h-4" />
          Confirm Secure Booking
        </Button>
        <p className="text-xs text-slate-500 text-center mt-3">
          🔒 Your information is encrypted and never shared with third parties.
        </p>
      </div>
    </div>
  );
}
