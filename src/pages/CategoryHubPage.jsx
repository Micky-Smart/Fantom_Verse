import React, { useState, useMemo } from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FilterSortBar } from '../components/FilterSortBar';
import { ContentCard } from '../components/ContentCard';
import { CharacterCard } from '../components/CharacterCard';
import { EventCard } from '../components/EventCard';
import { MerchandiseCard } from '../components/MerchandiseCard';
import {
  Sparkles,
  Images,
  Users2,
  Calendar,
  ShoppingBag,
  Film,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const CategoryHubPage = () => {
  const {
    activeCategoryId,
    categories,
    categoryData,
    characters,
    events,
    merchandise,
    openLightbox,
    navigateTo
  } = useFandom();

  const currentCategory = categories.find(c => c.id === activeCategoryId) || categories[0];
  const catalogItems = categoryData[activeCategoryId] || [];
  const categoryChars = characters.filter(c => c.category === activeCategoryId);
  const categoryEvents = events.filter(e => e.category === activeCategoryId);
  const categoryMerch = merchandise.filter(m => m.category === activeCategoryId);

  // Filter and Sort states
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubTag, setSelectedSubTag] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filter content items
  const filteredAndSortedItems = useMemo(() => {
    let list = [...catalogItems];

    // Filter by Content Type
    if (selectedType !== 'all') {
      list = list.filter(item => item.contentType === selectedType);
    }

    // Filter by SubTag
    if (selectedSubTag !== 'all') {
      list = list.filter(item => item.tags && item.tags.includes(selectedSubTag));
    }

    // Sort items
    list.sort((a, b) => {
      if (sortBy === 'alphabetical-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'alphabetical-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'popularity') {
        return (b.popularity || 0) - (a.popularity || 0);
      }
      // default: featured first, then popularity
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.popularity || 0) - (a.popularity || 0);
    });

    return list;
  }, [catalogItems, selectedType, selectedSubTag, sortBy]);

  // Gallery items for this category
  const galleryItems = catalogItems.filter(item => item.contentType === 'gallery' && item.galleryImages);

  const filterTypes = [
    { id: 'all', label: 'All Content' },
    { id: 'video', label: 'Videos & Trailers' },
    { id: 'article', label: 'Articles' },
    { id: 'gallery', label: 'Image Galleries' },
    { id: 'audio', label: 'Audio Tracks' },
    { id: 'releases', label: 'New Releases' }
  ];

  return (
    <div className="pb-20 space-y-10">
      {/* Breadcrumb Trail */}
      <Breadcrumbs
        items={[
          { label: 'Category Hubs', onClick: () => navigateTo('home') },
          { label: `${currentCategory?.name || 'Category'} Hub` }
        ]}
      />

      {/* Category Hero Banner with Dynamic Cultural Styling */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[340px] border p-6 sm:p-10 flex flex-col justify-end shadow-2xl group transition-all"
          style={{ borderColor: `${currentCategory?.color}50` }}
        >
          <div className="absolute inset-0 z-0">
            <img
              src={currentCategory?.coverImage}
              alt={currentCategory?.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />
          </div>

          <div className="relative z-10 space-y-3 max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3.5 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5"
                style={{ backgroundColor: currentCategory?.color }}
              >
                <span>{currentCategory?.cultureFlag}</span>
                <span>{currentCategory?.name} Universe</span>
              </span>

              <span className="text-xs text-slate-300 font-mono bg-zinc-900/80 px-2.5 py-1 rounded-full border border-white/10">
                {catalogItems.length} Featured Works
              </span>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <span>{currentCategory?.culture}</span>
                {currentCategory?.originCity && (
                  <span className="text-slate-300"> • 📍 {currentCategory.originCity}</span>
                )}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight mt-0.5">
                {currentCategory?.name} Universe
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              {currentCategory?.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Sort Toolbar */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <FilterSortBar
          types={filterTypes}
          selectedType={selectedType}
          onSelectType={setSelectedType}
          subTags={currentCategory?.subTags || []}
          selectedSubTag={selectedSubTag}
          onSelectSubTag={setSelectedSubTag}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredAndSortedItems.length}
        />

        {/* Content Catalog Grid */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/90 dark:border-zinc-800 p-8 text-slate-600 dark:text-zinc-400 shadow-sm">
            <p className="text-base font-semibold">No content matches the selected filter.</p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedSubTag('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* Image Gallery Showcase for this Category */}
      {galleryItems.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                Visual Archive & Fan Art
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Images className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>{currentCategory?.name} Photo & Art Gallery</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item.galleryImages, 0, item.title)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-purple-500 cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    {item.galleryImages.length} High-Res Slides
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Characters in this Category */}
      {categoryChars.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                Iconic Figures
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Users2 className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <span>{currentCategory?.name} Character Profiles</span>
              </h2>
            </div>
            <button
              onClick={() => navigateTo('characters', { categoryId: activeCategoryId })}
              className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-500 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryChars.slice(0, 5).map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </section>
      )}

      {/* Events in this Category */}
      {categoryEvents.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Community Gatherings
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>{currentCategory?.name} Events & Conventions</span>
              </h2>
            </div>
            <button
              onClick={() => navigateTo('events', { categoryId: activeCategoryId })}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>
      )}

      {/* Merchandise in this Category */}
      {categoryMerch.length > 0 && (
        <section className="px-4 sm:px-6 max-w-7xl mx-auto pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Official Gear
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>{currentCategory?.name} Fan Merchandise</span>
              </h2>
            </div>
            <button
              onClick={() => navigateTo('merchandise', { categoryId: activeCategoryId })}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1"
            >
              <span>Store</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryMerch.slice(0, 3).map((item) => (
              <MerchandiseCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
