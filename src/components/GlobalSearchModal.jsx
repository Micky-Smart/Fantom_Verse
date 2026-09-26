import React, { useState, useMemo, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { Search, X, Film, FileText, Music, Users, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    categoryData,
    characters,
    events,
    merchandise,
    articles,
    trailers,
    categories,
    navigateTo,
    setActiveVideo,
    openLightbox
  } = useFandom();

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Consolidate all searchable items
  const allSearchableItems = useMemo(() => {
    const items = [];

    // Category catalog items
    Object.entries(categoryData).forEach(([catId, list]) => {
      list.forEach(item => {
        items.push({
          id: item.id,
          title: item.title,
          description: item.description,
          category: catId,
          type: item.contentType,
          image: item.thumbnail,
          franchise: item.franchise,
          rawItem: item
        });
      });
    });

    // Characters
    characters.forEach(char => {
      items.push({
        id: char.id,
        title: char.name,
        description: char.biography,
        category: char.category,
        type: 'character',
        image: char.image,
        franchise: char.series,
        rawItem: char
      });
    });

    // Events
    events.forEach(evt => {
      items.push({
        id: evt.id,
        title: evt.title,
        description: `${evt.location} • ${evt.description}`,
        category: evt.category,
        type: 'event',
        image: evt.banner,
        franchise: '',
        rawItem: evt
      });
    });

    // Merchandise
    merchandise.forEach(merch => {
      items.push({
        id: merch.id,
        title: merch.name,
        description: `${merch.itemType} • $${merch.price} • ${merch.description}`,
        category: merch.category,
        type: 'merchandise',
        image: merch.image,
        franchise: merch.franchise,
        rawItem: merch
      });
    });

    // Articles
    articles.forEach(art => {
      items.push({
        id: art.id,
        title: art.title,
        description: art.summary,
        category: art.category,
        type: 'article',
        image: art.thumbnail,
        franchise: '',
        rawItem: art
      });
    });

    // Trailers
    trailers.forEach(trl => {
      items.push({
        id: trl.id,
        title: trl.title,
        description: trl.description,
        category: trl.category,
        type: 'trailer',
        image: trl.thumbnail,
        franchise: trl.franchise,
        rawItem: trl
      });
    });

    return items;
  }, [categoryData, characters, events, merchandise, articles, trailers]);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allSearchableItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Content type filter
      if (selectedType !== 'all') {
        if (selectedType === 'media') {
          if (!['video', 'audio', 'trailer', 'gallery'].includes(item.type)) return false;
        } else if (item.type !== selectedType) {
          return false;
        }
      }
      // Query search
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.franchise && item.franchise.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
      );
    }).slice(0, 20); // top 20 matches for speed
  }, [allSearchableItems, query, selectedCategory, selectedType]);

  const handleItemClick = (item) => {
    setIsSearchOpen(false);
    if (item.type === 'trailer' && item.rawItem.youtubeId) {
      setActiveVideo({ youtubeId: item.rawItem.youtubeId, title: item.title });
    } else if (item.type === 'gallery' && item.rawItem.galleryImages) {
      openLightbox(item.rawItem.galleryImages, 0, item.title);
    } else if (item.type === 'article') {
      navigateTo('article', { articleId: item.id });
    } else if (item.type === 'character') {
      navigateTo('characters', { targetCharacterId: item.id });
    } else if (item.type === 'event') {
      navigateTo('events', { categoryId: item.category });
    } else if (item.type === 'merchandise') {
      navigateTo('merchandise', { categoryId: item.category });
    } else {
      navigateTo('category', { categoryId: item.category });
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-backdrop-fade cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] cursor-default animate-modal-pop"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950">
          <Search className="w-5 h-5 text-rose-500 dark:text-purple-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search across all 7 fandoms (e.g. Demon Slayer, BTS, Elden Ring, Batman)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs flex items-center gap-1"
          >
            <span>ESC</span>
          </button>
        </div>

        {/* Filters Toolbar */}
        <div className="px-4 py-2.5 bg-slate-100/70 dark:bg-zinc-950/70 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
          {/* Category Filter */}
          <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">Category:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              selectedCategory === 'all'
                ? 'bg-rose-600 dark:bg-purple-600 text-white font-bold'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                selectedCategory === c.id
                  ? 'bg-rose-600 dark:bg-purple-600 text-white font-bold'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Content Type Filter */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-zinc-950/40 border-b border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1">Type:</span>
          {[
            { id: 'all', label: 'All Types' },
            { id: 'article', label: 'Articles' },
            { id: 'media', label: 'Media (Videos/Audio/Galleries)' },
            { id: 'character', label: 'Characters' },
            { id: 'event', label: 'Events' },
            { id: 'merchandise', label: 'Merch' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-2 py-0.5 rounded transition-colors ${
                selectedType === t.id
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for a different character, series, or category.</p>
            </div>
          ) : (
            filteredResults.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => handleItemClick(item)}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/90 dark:border-zinc-750 hover:border-rose-400 dark:hover:border-purple-500/40 cursor-pointer transition-all group"
              >
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-900 flex-shrink-0 border border-slate-200 dark:border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.src = "/images/categories/anime-cover.jpg";
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                      {item.category}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                      {item.type}
                    </span>
                    {item.franchise && (
                      <span className="text-[10px] text-rose-600 dark:text-pink-400 font-medium truncate">
                        • {item.franchise}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-purple-300 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-rose-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>{filteredResults.length} matching results found</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
