import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFandom } from '../context/FandomContext';
import { Bookmark, Quote, Info, X } from 'lucide-react';

export const CharacterCard = ({ character, isHighlighted = false }) => {
  const { isBookmarked, toggleBookmark } = useFandom();
  const [showModal, setShowModal] = useState(false);
  const bookmarked = isBookmarked(character.id);

  useEffect(() => {
    if (!showModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  return (
    <>
      <div
        id={`character-${character.id}`}
        className={`group rounded-2xl bg-white dark:bg-zinc-900 border transition-all duration-500 flex flex-col relative z-10 shadow-sm hover:shadow-xl dark:shadow-pink-900/10 scroll-mt-24 sm:scroll-mt-28 ${
          isHighlighted
            ? 'border-pink-500 dark:border-pink-400 ring-4 ring-pink-500/60 dark:ring-pink-400/60 shadow-2xl shadow-pink-500/40 scale-[1.02] -translate-y-1.5'
            : 'border-slate-200/90 dark:border-zinc-800 hover:border-pink-400 dark:hover:border-pink-500/40 hover:-translate-y-1'
        }`}
      >
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl bg-slate-900 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/images/categories/anime-cover.jpg';
            }}
          />

          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-wider text-pink-300">
            {character.category}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(character);
            }}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
              bookmarked
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/50'
                : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90'
            }`}
            title={bookmarked ? 'Remove from bookmarks' : 'Save character'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

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

            {character.quote && (
              <p className="text-[11px] italic text-slate-600 dark:text-slate-400 line-clamp-1 mt-1.5 flex items-center gap-1">
                <Quote className="w-2.5 h-2.5 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                <span>"{character.quote}"</span>
              </p>
            )}

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
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full mt-4 py-2 rounded-xl bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-600 border border-slate-200 hover:border-pink-300 dark:bg-white/5 dark:hover:bg-pink-600/20 dark:border-white/10 dark:hover:border-pink-500/40 text-xs font-semibold dark:text-slate-300 dark:hover:text-pink-300 transition-all flex items-center justify-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5" />
            <span>View Full Profile</span>
          </button>
        </div>
      </div>

      {showModal && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-backdrop-fade cursor-pointer"
              onClick={() => setShowModal(false)}
              aria-label="Close character details"
            />

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-2xl shadow-black/50 animate-modal-pop flex flex-col"
            >
              <div className="relative p-4 sm:p-5 border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-zinc-950 flex items-start gap-4 flex-shrink-0">
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200 dark:border-white/10 shadow-md">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = '/images/categories/anime-cover.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 pr-10">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-1 rounded-lg bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30 text-[10px] font-bold uppercase tracking-wider">
                      {character.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {character.series}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display leading-tight">
                    {character.name}
                  </h2>

                  {character.quote && (
                    <p className="text-xs sm:text-sm italic text-pink-600 dark:text-pink-400 mt-1.5 flex items-start gap-1.5">
                      <Quote className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>"{character.quote}"</span>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin">
                {character.biography && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-2">
                      Biography & Lore
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {character.biography}
                    </p>
                  </div>
                )}

                {character.traits?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-3">
                      Traits & Abilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {character.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 text-xs font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 sm:px-5 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => toggleBookmark(character)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookmarked
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-900/30'
                      : 'bg-white dark:bg-white/5 hover:bg-pink-50 dark:hover:bg-pink-600/20 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}</span>
                </button>

                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {character.category}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};