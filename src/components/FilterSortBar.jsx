import React from 'react';
import { Filter, ArrowUpDown, Search, X } from 'lucide-react';

export const FilterSortBar = ({
  searchQuery = '',
  onSearchChange,
  categoryName = '',
  types = [],
  selectedType,
  onSelectType,
  subTags = [],
  selectedSubTag,
  onSelectSubTag,
  sortBy,
  onSortChange,
  totalCount = 0
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-4 sm:p-5 mb-6 backdrop-blur-md shadow-sm dark:shadow-lg space-y-4 transition-colors">
      {/* Search Bar: First element inside the box, styled a little wider with responsive layout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/5">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500 dark:text-purple-400 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={`Search ${categoryName ? `${categoryName} universe` : 'fandom'}, titles, franchises, or tags...`}
            aria-label={`Search ${categoryName || 'category'} universe content`}
            className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700/80 bg-slate-50/90 dark:bg-zinc-950/80 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 dark:text-white shadow-inner focus:border-rose-500 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:focus:ring-purple-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
          <span className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-zinc-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            {totalCount} {totalCount === 1 ? 'item' : 'items'} found
          </span>
        </div>
      </div>

      {/* Middle Row: Type Pills & Sort Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-rose-500 dark:text-purple-400" />
            <span>Type:</span>
          </span>
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedType === t.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 dark:from-purple-600 dark:to-pink-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-rose-500 dark:text-cyan-400" />
            <span>Sort:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-rose-500 dark:focus:border-purple-500 cursor-pointer shadow-sm"
          >
            <option value="featured">Featured / Top Picks</option>
            <option value="alphabetical-asc">Alphabetical (A - Z)</option>
            <option value="alphabetical-desc">Alphabetical (Z - A)</option>
            <option value="newest">Newest Releases</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Sub-tags (if provided) */}
      {subTags && subTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100 dark:border-white/5 text-xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
            Cultural Tags:
          </span>
          <button
            onClick={() => onSelectSubTag('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex-shrink-0 ${
              selectedSubTag === 'all'
                ? 'bg-rose-100 text-rose-700 dark:bg-cyan-600/30 dark:text-cyan-300 border border-rose-300 dark:border-cyan-500/50'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All Tags
          </button>
          {subTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSubTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                selectedSubTag === tag
                  ? 'bg-rose-100 text-rose-700 dark:bg-cyan-600/30 dark:text-cyan-300 border border-rose-300 dark:border-cyan-500/50'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
