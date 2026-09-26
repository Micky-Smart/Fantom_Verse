import React, { useState } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Bookmark,
  Trash2,
  Download,
  FileText,
  StickyNote,
  Share2,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const BookmarksPage = () => {
  const {
    bookmarks,
    toggleBookmark,
    sessionNotes,
    setNote,
    exportBookmarks,
    navigateTo,
    setActiveVideo
  } = useFandom();

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredBookmarks = bookmarks.filter(b => {
    if (activeFilter === 'all') return true;
    return b.type === activeFilter;
  });

  const handleItemClick = (b) => {
    if (b.type === 'article') {
      navigateTo('article', { articleId: b.id });
    } else if (b.type === 'character') {
      navigateTo('characters', { targetCharacterId: b.id });
    } else if (b.type === 'event') {
      navigateTo('events', { categoryId: b.category });
    } else if (b.type === 'merchandise') {
      navigateTo('merchandise', { categoryId: b.category });
    } else {
      navigateTo('category', { categoryId: b.category });
    }
  };

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: 'Saved Bookmarks & Session Notes' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400">
                <Bookmark className="w-5 h-5 fill-current" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                Browser Storage System
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              My Fandom Bookmarks
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Saved articles, media clips, character profiles, and conventions stored persistently in LocalStorage, with personal private notes kept in SessionStorage.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportBookmarks('json')}
              disabled={bookmarks.length === 0}
              className="px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-600/30 dark:hover:bg-purple-600 border border-purple-300 dark:border-purple-500/40 text-purple-800 dark:text-purple-200 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              title="Download formatted JSON with session notes"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => exportBookmarks('txt')}
              disabled={bookmarks.length === 0}
              className="px-3.5 py-2 rounded-xl bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-600/30 dark:hover:bg-cyan-600 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-200 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              title="Download formatted plain text file"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export TXT</span>
            </button>
          </div>
        </div>

        {/* Bookmarks Tip */}
        <div className="p-3.5 rounded-2xl bg-pink-50 dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 flex items-start sm:items-center gap-3 text-xs text-pink-900 dark:text-pink-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="flex-1">
            <strong>Bookmarks & Notes:</strong> Your saved favorites remain securely stored in your browser. Personal quick notes are private to your active session and can be exported as JSON or TXT anytime.
          </div>
        </div>

        {/* Filter Types Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: `All Bookmarks (${bookmarks.length})` },
            { id: 'article', label: 'Articles' },
            { id: 'character', label: 'Characters' },
            { id: 'video', label: 'Videos & Trailers' },
            { id: 'event', label: 'Events' },
            { id: 'merchandise', label: 'Merchandise' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === f.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-900/30'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Bookmarks List */}
        {filteredBookmarks.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-8 text-slate-500 dark:text-slate-400 space-y-3 shadow-sm">
            <Bookmark className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600" />
            <p className="text-base font-semibold">No bookmarked items in this category.</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click the bookmark ribbon icon on any article, character card, trailer, or convention to save it here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((item) => {
              const currentNote = sessionNotes[item.id] || '';
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-pink-400 dark:hover:border-pink-500/40 p-4 sm:p-5 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row gap-5"
                >
                  {/* Left: Item Visual & Summary */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover bg-slate-900 border border-slate-200 dark:border-white/10 flex-shrink-0 cursor-pointer"
                      onClick={() => handleItemClick(item)}
                      onError={(e) => {
                        e.target.src = "/images/categories/anime-cover.jpg";
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                          {item.type}
                        </span>
                        {item.franchise && (
                          <span className="text-[10px] text-pink-600 dark:text-pink-400 font-medium truncate">
                            • {item.franchise}
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => handleItemClick(item)}
                        className="text-base font-bold text-slate-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-300 transition-colors cursor-pointer truncate"
                      >
                        {item.title}
                      </h3>

                      <span className="text-[11px] text-slate-500 block mt-1">
                        Saved on {new Date(item.dateAdded).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => handleItemClick(item)}
                          className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 flex items-center gap-1"
                        >
                          <span>Open Item</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleBookmark(item)}
                          className="text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Personal Session Note (Session Storage only) */}
                  <div className="md:w-80 flex flex-col justify-between bg-slate-50 dark:bg-black/30 rounded-xl p-3 border border-slate-200 dark:border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <StickyNote className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Session Note</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 font-mono">
                        SessionStorage
                      </span>
                    </div>

                    <textarea
                      rows={2}
                      value={currentNote}
                      onChange={(e) => setNote(item.id, e.target.value)}
                      placeholder="Type personal thoughts, timestamps, or theories..."
                      className="w-full p-2 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white text-xs rounded-lg border border-slate-200 dark:border-zinc-700 focus:outline-none focus:border-cyan-500 resize-none placeholder-slate-400 dark:placeholder-slate-500"
                    />

                    <span className="text-[10px] text-slate-500 mt-1 block">
                      {currentNote ? '✓ Stored in SessionStorage' : 'Notes clear when browser closes'}
                    </span>
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
