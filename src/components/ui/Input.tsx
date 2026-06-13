'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="relative">
      <input
        id={inputId}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        placeholder=" "
        className={cn(
          'peer w-full px-4 pt-6 pb-2 rounded-xl bg-navy-800/60 border text-slate-100',
          'placeholder-transparent outline-none transition-all duration-300',
          'focus:ring-2 focus:ring-teal-400/30',
          error
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-white/10 focus:border-teal-400/50',
          className
        )}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'absolute left-4 transition-all duration-300 pointer-events-none',
          'peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400',
          'peer-focus:top-2 peer-focus:text-xs',
          'top-2 text-xs',
          focused ? 'text-teal-400' : 'text-slate-400'
        )}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1.5 text-xs text-red-400 pl-1">{error}</p>
      )}
    </div>
  );
}
