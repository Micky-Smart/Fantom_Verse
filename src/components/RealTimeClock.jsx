import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const RealTimeClock = ({ compact = false }) => {
  const [timeState, setTimeState] = useState({
    timeStr: '',
    dateStr: ''
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format 12-hour time with seconds: 10:24:36 AM
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });

      // Format date: Wed, Sep 23, 2026
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      setTimeState({ timeStr, dateStr });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs">
        <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
        <span className="font-mono font-semibold text-slate-800 dark:text-cyan-300">
          {timeState.timeStr}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 text-xs shadow-sm">
      <div className="relative">
        <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
      </div>
      <div className="flex flex-col">
        <span className="font-mono font-bold text-slate-800 dark:text-cyan-300 tracking-wide text-[13px] leading-tight">
          {timeState.timeStr}
        </span>
        <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
          {timeState.dateStr}
        </span>
      </div>
    </div>
  );
};
