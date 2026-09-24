import React from 'react';
import { useFandom } from '../context/FandomContext';
import { Users } from 'lucide-react';

export const VisitorCounter = ({ showLabel = true, compact = false }) => {
  const { visitorCount } = useFandom();

  // Format as 7-digit padded counter: 0001248
  const digits = String(visitorCount).padStart(7, '0').split('');

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs">
        <Users className="w-3.5 h-3.5 text-rose-500 dark:text-purple-400" />
        <span className="font-mono font-bold text-slate-800 dark:text-zinc-200 tracking-wider">
          {visitorCount.toLocaleString()}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      {showLabel && (
        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-zinc-400">
          <Users className="w-3 h-3 text-rose-500 dark:text-purple-400" />
          <span>Community Visits</span>
        </div>
      )}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-950 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 shadow-inner">
        {digits.map((digit, idx) => (
          <div
            key={idx}
            className="w-5 h-7 sm:w-6 sm:h-8 flex items-center justify-center rounded bg-white dark:bg-zinc-900 text-slate-900 dark:text-white font-mono font-black text-sm sm:text-base border border-slate-200 dark:border-zinc-800 shadow-sm"
          >
            <span className="text-rose-600 dark:text-purple-300">
              {digit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
