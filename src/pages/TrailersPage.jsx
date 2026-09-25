import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Film, Play, Filter, Calendar, Clock, Bookmark, Sparkles, Search, X } from 'lucide-react';

export const TrailersPage = () => {
  const { trailers, categories, setActiveVideo, isBookmarked, toggleBookmark, navigateTo } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'upcoming' | 'recently_released'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrailers = useMemo(() => {
    return trailers.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (query && ![item.title, item.description, item.franchise, item.category].some(value => value?.toLowerCase().includes(query))) {
        return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && item.releaseStatus !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [trailers, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: 'Trailers & Media Hub' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400">
                <Film className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                Aggregated Media Hub
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              Trailers & Teasers
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              High-definition official trailers, world premieres, and upcoming release teasers across all 7 fandom universes.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar (Search, Release Status & Category Filter) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm dark:shadow-lg space-y-4">
          {/* Search Bar: First element inside the box, styled a little wider with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/5">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 dark:text-red-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trailers, franchises, or categories..."
                aria-label="Search trailers"
                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700/80 bg-slate-50/90 dark:bg-zinc-950/80 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 dark:text-white shadow-inner focus:border-red-500 dark:focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:focus:ring-red-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-zinc-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                Showing {filteredTrailers.length} of {trailers.length} trailers
              </span>
            </div>
          </div>

          {/* Release Status Filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0">
              Release Status:
            </span>
            {[
              { id: 'all', label: 'All Releases' },
              { id: 'upcoming', label: '🔥 Upcoming Releases' },
              { id: 'recently_released', label: '✨ Recently Released' }
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedStatus === s.id
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 flex-shrink-0">
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                  selectedCategory === c.id
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trailers Grid */}
        {filteredTrailers.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 p-8 text-slate-600 dark:text-zinc-400 shadow-sm">
            <p className="text-base font-semibold">No trailers match your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 shadow-md"
            >
              Reset Filters & Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrailers.map((trl) => {
            const isUpcoming = trl.releaseStatus === 'upcoming';
            const bookmarked = isBookmarked(trl.id);
            return (
              <div
                key={trl.id}
                className="group rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-500/40 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                {/* Video Thumbnail with Play Overlay */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveVideo({ youtubeId: trl.youtubeId, title: trl.title })}
                >
                  <img
                    src={trl.thumbnail}
                    alt={trl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                        isUpcoming
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/90 dark:text-amber-300 dark:border-amber-500/40'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-500/40'
                      }`}
                    >
                      {isUpcoming ? 'Upcoming' : 'Recently Released'}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white">
                    {trl.duration}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(trl);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
                      bookmarked
                        ? 'bg-pink-600 text-white shadow-lg'
                        : 'bg-black/60 text-white/80 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-xs">
                      <span className="font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                        {trl.franchise}
                      </span>
                      <span className="text-slate-400 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400 uppercase font-semibold text-[10px]">
                        {trl.category}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveVideo({ youtubeId: trl.youtubeId, title: trl.title })}
                      className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {trl.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {trl.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trl.releaseDate}</span>
                    </span>
                    <button
                      onClick={() => setActiveVideo({ youtubeId: trl.youtubeId, title: trl.title })}
                      className="text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 font-bold flex items-center gap-1"
                    >
                      <span>Play Trailer</span>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </section>
    </div>
  );
};
