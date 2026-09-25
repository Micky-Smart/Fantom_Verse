import React from 'react';
import { useFandom } from '../context/FandomContext';
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

export const Breadcrumbs = ({ items = [], showBackButton = true }) => {
  const { navigateTo, goBack } = useFandom();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 flex-wrap">
        {showBackButton && (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-purple-300 hover:border-rose-300 dark:hover:border-purple-500/40 text-xs font-bold shadow-xs hover:shadow-sm transition-all transform hover:-translate-x-0.5 cursor-pointer flex-shrink-0"
            title="Go back to previous page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-500 dark:text-purple-400" />
            <span>Back</span>
          </button>
        )}

        <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-400">
          <li>
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1 hover:text-purple-400 transition-colors py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
                {isLast || !item.onClick ? (
                  <span className="text-rose-600 dark:text-purple-300 font-semibold truncate max-w-[200px] sm:max-w-xs">
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="hover:text-rose-600 dark:hover:text-purple-400 transition-colors py-1 truncate max-w-[150px] text-slate-600 dark:text-slate-400"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
