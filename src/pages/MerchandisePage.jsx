import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MerchandiseCard } from '../components/MerchandiseCard';
import { ShoppingBag, Filter, ShieldCheck, ArrowUpDown } from 'lucide-react';

export const MerchandisePage = () => {
  const { merchandise, categories, setIsCartOpen, cartCount } = useFandom();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItemType, setSelectedItemType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const allItemTypes = useMemo(() => {
    return Array.from(new Set(merchandise.map(m => m.itemType))).filter(Boolean);
  }, [merchandise]);

  const filteredMerchandise = useMemo(() => {
    let list = merchandise.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedItemType === 'hoodies') {
        return item.subType === 'Hoodie' || item.subType === 'Jacket' || item.subType === 'Sweater';
      }
      if (selectedItemType === 'apparel') {
        return item.itemType === 'Apparel';
      }
      if (selectedItemType === 'figures') {
        return item.itemType === 'Figure';
      }
      if (selectedItemType === 'lightsticks') {
        return item.itemType === 'Lightstick';
      }
      if (selectedItemType === 'collectibles') {
        return item.itemType === 'Collectible' || item.itemType === 'Prop Replica' || item.itemType === 'Poster' || item.itemType === 'Book' || item.itemType === 'Plushie';
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }, [merchandise, selectedCategory, selectedItemType, sortBy]);

  return (
    <div className="pb-20 space-y-8">
      <Breadcrumbs items={[{ label: 'Fan Merchandise Showcase & Shopping' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                Officially Licensed Fan Gear
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
              Merchandise & Collectibles
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Browse apparel, figures, plushies, lightsticks, and rare art replicas. Add items to your temporary shopping cart with live total calculations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-900/30 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Store Quality Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/20 flex items-center gap-3 text-xs text-amber-900 dark:text-amber-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <span>
            <strong>Official Fan Collectibles:</strong> Explore premium fan gear, heavyweight hoodies, figures, and replicas. Add items to your shopping cart with instant real-time calculations.
          </span>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md dark:shadow-lg space-y-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2 flex-shrink-0">
              Universe:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Merchandise ({merchandise.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === c.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Item Type & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-white/5 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 flex-shrink-0">
                Filter Gear:
              </span>
              {[
                { id: 'all', label: 'All Items' },
                { id: 'hoodies', label: '🧥 Hoodies & Outerwear' },
                { id: 'apparel', label: '👕 All Clothing' },
                { id: 'figures', label: '🎎 Figures' },
                { id: 'collectibles', label: '💎 Replicas & Plushies' },
                { id: 'lightsticks', label: '✨ Concert Lightsticks' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedItemType(pill.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
                    selectedItemType === pill.id
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
              <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Sort by:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="featured">Featured Collectibles</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMerchandise.map(item => (
            <MerchandiseCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};
