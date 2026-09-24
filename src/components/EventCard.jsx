import React from 'react';
import { useFandom } from '../context/FandomContext';
import { Calendar, MapPin, Bookmark, Users, Clock, CheckCircle } from 'lucide-react';

export const EventCard = ({ event }) => {
  const { isBookmarked, toggleBookmark } = useFandom();
  const bookmarked = isBookmarked(event.id);
  const isUpcoming = event.status === 'upcoming';

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group rounded-2xl bg-white dark:bg-zinc-900 hover:bg-cyan-50/20 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-cyan-400 dark:hover:border-cyan-500/40 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-cyan-900/10">
      {/* Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/images/categories/gaming-cover.jpg";
          }}
        />

        {/* Status Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              isUpcoming
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-500/40'
                : 'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-900/90 dark:text-slate-400 dark:border-white/10'
            }`}
          >
            {isUpcoming ? '● Upcoming' : 'Completed'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase text-cyan-300">
            {event.category}
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(event)}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/50'
              : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90'
          }`}
          title={bookmarked ? "Remove from bookmarks" : "Bookmark event"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Type chip bottom */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
          {event.type}
        </div>
      </div>

      {/* Info Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-300 font-semibold mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
            {event.attendees && (
              <>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{event.attendees}</span>
                </span>
              </>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
            {event.title}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
            Fandom Gathering
          </span>
          <button
            onClick={() => toggleBookmark(event)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
              bookmarked
                ? 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-500/30'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
            }`}
          >
            {bookmarked ? 'Saved to Schedule' : '+ Add to Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};
