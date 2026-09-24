import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EventCard } from '../components/EventCard';
import { Calendar, MapPin, Clock, Filter, Sparkles } from 'lucide-react';

export const EventsPage = () => {
  const { events, categories } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'upcoming' | 'past'

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'all' && evt.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [events, selectedCategory, selectedStatus]);

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

          <span className="text-xs font-mono text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800">
            Showing {filteredEvents.length} of {events.length} events
          </span>
        </div>

        {/* Filters Bar (Status & Category) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md dark:shadow-lg space-y-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(evt => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>
    </div>
  );
};
