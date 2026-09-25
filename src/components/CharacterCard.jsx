import React, { useState, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { Bookmark, Sparkles, Quote, Info, X } from 'lucide-react';

export const CharacterCard = ({ character }) => {
  const { isBookmarked, toggleBookmark } = useFandom();
  const [showModal, setShowModal] = useState(false);
  const bookmarked = isBookmarked(character.id);

  // Make the area around it unscrollable when open
  useEffect(() => {
    if (showModal) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setShowModal(false);
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showModal]);

  return (
    <>
      {/* Click-away backdrop overlay making the area around it unscrollable */}
      {showModal && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] animate-backdrop-fade cursor-pointer"
          aria-label="Close character details"
        />
      )}

      {/* Main Character Card (opens where the character is, not fixed) */}
      <div
        className={`group rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 transition-all duration-300 flex flex-col ${
          showModal
            ? 'relative z-50 shadow-2xl ring-2 ring-pink-500/80 shadow-pink-900/40'
            : 'relative z-10 hover:border-pink-400 dark:hover:border-pink-500/40 hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-pink-900/10'
        }`}
      >
        {/* Character Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-slate-900 cursor-pointer" onClick={() => setShowModal(true)}>
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "/images/categories/anime-cover.jpg";
            }}
          />

          {/* Category Pill */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-pink-300">
            {character.category}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(character);
            }}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/50'
                : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90'
            }`}
            title={bookmarked ? "Remove from bookmarks" : "Save character"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between rounded-b-2xl">
          <div>
            <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              {character.series}
            </span>
            <h3
              onClick={() => setShowModal(true)}
              className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors cursor-pointer mt-0.5 leading-snug"
            >
              {character.name}
            </h3>

            {/* Quote snippet if present */}
            {character.quote && (
              <p className="text-[11px] italic text-slate-600 dark:text-slate-400 line-clamp-1 mt-1.5 flex items-center gap-1">
                <Quote className="w-2.5 h-2.5 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                <span>"{character.quote}"</span>
              </p>
            )}

            {/* Traits */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {character.traits?.slice(0, 3).map((trait, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-500/20 font-medium"
                >
                  {trait}
                </span>
              ))}
              {character.traits?.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                  +{character.traits.length - 3}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-4 py-2 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-300 dark:bg-white/5 dark:hover:bg-pink-600/20 dark:border-white/10 dark:hover:border-pink-500/40 text-xs font-semibold dark:text-slate-300 dark:hover:text-pink-300 transition-all flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            <span>View Full Profile</span>
          </button>
        </div>

        {/* In-place Character Profile Popup (Opens where the character is, not fixed, scrollable in spot) */}
        {showModal && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 z-50 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-pink-400 dark:border-pink-500/60 shadow-2xl flex flex-col overflow-hidden animate-modal-pop cursor-default"
          >
            {/* Header: Compact image thumbnail + title + category + close */}
            <div className="p-3.5 pb-2.5 border-b border-slate-100 dark:border-white/10 flex items-start gap-3 bg-slate-50/80 dark:bg-zinc-950/60 flex-shrink-0">
              {/* Thumbnail */}
              <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 dark:border-white/10 shadow-sm">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.src = "/images/categories/anime-cover.jpg";
                  }}
                />
              </div>

              {/* Character Header Details */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30 text-[9px] font-bold uppercase tracking-wider">
                    {character.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {character.series}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate font-display leading-tight">
                  {character.name}
                </h3>

                {character.quote && (
                  <p className="text-[10px] italic text-pink-600 dark:text-pink-400 line-clamp-1 mt-0.5 flex items-center gap-1">
                    <Quote className="w-2.5 h-2.5 text-pink-500 flex-shrink-0" />
                    <span className="truncate">"{character.quote}"</span>
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content (Scrolls in this spot without moving the page) */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs scrollbar-thin">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Biography & Lore
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {character.biography}
                </p>
              </div>

              {character.traits?.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                    Traits & Abilities
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {character.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-500/20 font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Bookmark Toggle Button */}
            <div className="p-3 px-3.5 bg-slate-50/80 dark:bg-zinc-950/60 border-t border-slate-100 dark:border-white/10 flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => toggleBookmark(character)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  bookmarked
                    ? 'bg-pink-600 text-white shadow-sm shadow-pink-900/40'
                    : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}</span>
              </button>

              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {character.category}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
