import { APP_NAME } from '@/lib/constants';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[#090A0B]/90 backdrop-blur-xl border-b border-[#1F2227]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#121417] border border-[#1F2227] flex items-center justify-center shadow-inner">
            <span className="text-[#479BFF] font-extrabold text-sm">AE</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none tracking-wide">{APP_NAME}</h1>
            <p className="text-[9px] font-mono text-[#479BFF] uppercase tracking-widest mt-0.5">Admin Dashboard</p>
          </div>
        </div>
      </div>
    </header>
  );
}
