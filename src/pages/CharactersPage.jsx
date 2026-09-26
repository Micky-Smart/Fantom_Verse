import React, { useState, useMemo, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CharacterCard } from '../components/CharacterCard';
import { Users2, Search, Filter, X } from 'lucide-react';

export const CharactersPage = () => {
  const { characters, categories, targetCharacterId, setTargetCharacterId } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [franchiseFilter, setFranchiseFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCharId, setHighlightedCharId] = useState(null);

  useEffect(() => {
    if (targetCharacterId) {
      // Keep all characters visible
      setSelectedCategory('all');
      setSearchQuery('');
      setFranchiseFilter('');
      setHighlightedCharId(targetCharacterId);

      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(`character-${targetCharacterId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      const clearHighlightTimer = setTimeout(() => {
        setHighlightedCharId(null);
        if (setTargetCharacterId) setTargetCharacterId(null);
      }, 3500);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(clearHighlightTimer);
      };
    }
  }, [targetCharacterId, setTargetCharacterId]);

  // Extract all unique franchises
  const allFranchises = useMemo(() => {
    const list = Array.from(new Set(characters.map(c => c.series))).filter(Boolean);
    return list.sort();
  }, [characters]);

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      const query = searchQuery.trim().toLowerCase();
      if (query && ![char.name, char.series, char.category, char.quote, ...(char.traits || [])].some(value => value?.toLowerCase().includes(query))) {
        return false;
      }
      if (selectedCategory !== 'all' && char.category !== selectedCategory) {
        return false;
      }
      if (franchiseFilter && char.series !== franchiseFilter) {
        return false;
      }
      return true;
    });
  }, [characters, searchQuery, selectedCategory, franchiseFilter]);

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: '35+ Character Profiles Roster' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-pink-100 dark:bg-pink-600/20 text-pink-600 dark:text-pink-400">
                <Users2 className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                Character Encyclopedia
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              Fandom Characters & Heroes
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Explore 35+ legendary heroes, demigods, idols, and anti-heroes across Anime, Gaming, Movies, TV, K-Pop, Comics, and Manga.
            </p>
          </div>
        </div>

        {/* Filter Controls (Search, Category and Franchise) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm dark:shadow-lg space-y-4">
          {/* Search Bar: First element inside the box, styled a little wider with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/5">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500 dark:text-pink-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters, series, or abilities..."
                aria-label="Search characters"
                className="w-full rounded-2xl border border-slate-200 dark:border-zinc-700/80 bg-slate-50/90 dark:bg-zinc-950/80 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-slate-900 dark:text-white shadow-inner focus:border-pink-500 dark:focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-500"
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
                Showing {filteredCharacters.length} of {characters.length} characters
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0">
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${selectedCategory === 'all'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              All (35+)
            </button>
            {categories.map((c) => {
              const count = characters.filter(ch => ch.category === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${selectedCategory === c.id
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Franchise Select Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-pink-500" />
              <span>Franchise:</span>
            </span>
            <select
              value={franchiseFilter}
              onChange={(e) => setFranchiseFilter(e.target.value)}
              className="bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-pink-500 cursor-pointer"
            >
              <option value="">All Franchises ({allFranchises.length})</option>
              {allFranchises.map((f, idx) => (
                <option key={idx} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {franchiseFilter && (
              <button
                onClick={() => setFranchiseFilter('')}
                className="text-xs text-pink-600 dark:text-pink-400 hover:underline ml-2"
              >
                Clear franchise filter
              </button>
            )}
          </div>
        </div>

        {/* Character Grid */}
        {filteredCharacters.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 p-8 text-slate-600 dark:text-zinc-400 shadow-sm">
            <p className="text-base font-semibold">No characters match your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setFranchiseFilter('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-500 shadow-md"
            >
              Reset Filters & Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredCharacters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isHighlighted={highlightedCharId === char.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
