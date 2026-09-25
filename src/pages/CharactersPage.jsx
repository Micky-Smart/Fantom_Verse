import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CharacterCard } from '../components/CharacterCard';
import { Users2, Search, Filter } from 'lucide-react';

export const CharactersPage = () => {
  const { characters, categories } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [franchiseFilter, setFranchiseFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
            <div className="relative mt-3 w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-500 dark:text-pink-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters, series, or abilities..."
                aria-label="Search characters"
                className="w-full rounded-xl border border-slate-200 bg-white/90 py-2.5 pl-9 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-pink-400 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-pink-500"
              />
            </div>
          </div>

          <span className="text-xs font-mono text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800">
            Showing {filteredCharacters.length} of {characters.length} characters
          </span>
        </div>

        {/* Filter Controls (Filterable by category and franchise) */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md dark:shadow-lg space-y-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0">
              Category:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === 'all'
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === c.id
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredCharacters.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      </section>
    </div>
  );
};
