import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EventCard } from '../components/EventCard';
import { Calendar, MapPin, Clock, Filter, Sparkles, Search, X } from 'lucide-react';

export const EventsPage = () => {
  const { events, categories } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'upcoming' | 'past'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const query = searchQuery.trim().toLowerCase();
      if (query && ![evt.title, evt.description, evt.venue, evt.location, evt.category].some(value => value?.toLowerCase().includes(query))) {
        return false;
      }
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && evt.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: '21+ Events & Conventions Highlights' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-600/20 text-cyan-700 dark:text-cyan-400">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
                Convention & Gathering Schedule
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              Fandom Events Calendar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Discover comic-cons, anime expos, game releases, stadium concert tours, and local fan watch parties around the globe.
            </p>
          </div>
        </div>

        {/* Filters Bar (Search, Status & Category) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm dark:shadow-lg space-y-4">
          {/* Search Bar: First element inside the box, styled a little wider with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/5">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-600 dark:text-cyan-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, locations, or fandoms..."
                aria-label="Search events"
                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700/80 bg-slate-50/90 dark:bg-zinc-950/80 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 dark:text-white shadow-inner focus:border-cyan-500 dark:focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-500"
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
                Showing {filteredEvents.length} of {events.length} events
              </span>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0">
              Timeline:
            </span>
            {[
              { id: 'all', label: 'All Events (21+)' },
              { id: 'upcoming', label: '🟢 Upcoming Events' },
              { id: 'past', label: '⚪ Past Highlights & Archives' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedStatus === s.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Category Pills */}
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

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 p-8 text-slate-600 dark:text-zinc-400 shadow-sm">
            <p className="text-base font-semibold">No events match your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 shadow-md"
            >
              Reset Filters & Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(evt => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
