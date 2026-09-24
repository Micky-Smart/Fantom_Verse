import React, { useState } from 'react';
import { useFandom } from '../context/FandomContext';
import { Bookmark, Sparkles, Quote, Info, X } from 'lucide-react';

export const CharacterCard = ({ character }) => {
  const { isBookmarked, toggleBookmark } = useFandom();
  const [showModal, setShowModal] = useState(false);
  const bookmarked = isBookmarked(character.id);

  return (
    <>
      <div className="group rounded-2xl bg-white dark:bg-zinc-900 hover:bg-pink-50/30 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-pink-400 dark:hover:border-pink-500/40 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-pink-900/10">
        {/* Character Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setShowModal(true)}>
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
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
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
      </div>

      {/* Character Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-pink-400 dark:border-pink-500/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 relative bg-slate-900 aspect-[3/4] md:aspect-auto">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
            </div>

            {/* Modal Bio Details */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {character.category}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {character.series}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display mb-2">
                  {character.name}
                </h3>

                {character.quote && (
                  <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-500/20 text-xs italic text-pink-900 dark:text-pink-200 mb-4">
                    "{character.quote}"
                  </div>
                )}

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1">
                  Biography & Lore
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {character.biography}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                  Traits & Abilities
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {character.traits?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-xs font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => toggleBookmark(character)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    bookmarked
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-200 border border-slate-200 dark:border-white/10'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  <span>{bookmarked ? 'Bookmarked' : 'Add to Bookmarks'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
