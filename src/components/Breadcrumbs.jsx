import React from 'react';
import { useFandom } from '../context/FandomContext';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  const { navigateTo } = useFandom();

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center gap-3 flex-wrap">
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
