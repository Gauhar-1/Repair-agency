'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }


      window.location.href = '/admin';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090A0B] flex flex-col items-center justify-center p-4">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none fixed" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#479BFF]/5 rounded-full blur-[150px] pointer-events-none fixed" />

      <div className="w-full max-w-md bg-[#121417] border border-[#1F2227] rounded-sm p-8 relative z-10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-sm bg-[#090A0B] border border-[#1F2227] flex items-center justify-center shadow-inner">
            <span className="text-[#479BFF] font-extrabold text-xl">AE</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-white text-center mb-2">{APP_NAME}</h1>
        <p className="text-xs font-mono text-[#479BFF] uppercase tracking-widest text-center mb-8">Admin Gateway</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-[#090A0B] border border-[#1F2227] rounded-sm text-white text-sm focus:border-[#479BFF] focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#090A0B] border border-[#1F2227] rounded-sm text-white text-sm focus:border-[#479BFF] focus:outline-none transition-colors"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-[#FF5E00]/10 border border-[#FF5E00]/30 rounded-sm text-[#FF5E00] text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#0062FF] hover:bg-[#479BFF] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
