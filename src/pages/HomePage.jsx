import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useFandom } from '../context/FandomContext';
import { MerchandiseCard } from '../components/MerchandiseCard';
import { EventCard } from '../components/EventCard';
import {
  Sparkles,
  Play,
  Bookmark,
  ArrowRight,
  TrendingUp,
  Calendar,
  Tv,
  Gamepad2,
  Film,
  Tv2,
  Music,
  BookOpen,
  BookMarked,
  Flame,
  Star,
  ChevronRight,
  X,
  Search,
  Layers
} from 'lucide-react';

const categoryIconMap = {
  anime: Tv,
  gaming: Gamepad2,
  movies: Film,
  tvshows: Tv2,
  kpop: Music,
  comics: BookOpen,
  manga: BookMarked
};

export const HomePage = () => {
  const {
    categories,
    characters,
    events,
    merchandise,
    articles,
    trailers,
    navigateTo,
    setActiveVideo,
    isBookmarked,
    toggleBookmark
  } = useFandom();

  const [isAllFandomsOpen, setIsAllFandomsOpen] = useState(false);
  const [fandomSearchQuery, setFandomSearchQuery] = useState('');

  const closeAllFandomsModal = () => {
    setIsAllFandomsOpen(false);
    setFandomSearchQuery('');
  };

  useEffect(() => {
    if (!isAllFandomsOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        closeAllFandomsModal();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isAllFandomsOpen]);

  // Featured Hero Item (Demon Slayer)
  const heroItem = {
    id: "anime-1",
    title: "DEMON SLAYER",
    subtitle: "SWORDSMITH VILLAGE ARC",
    description: "Tanjiro and his comrades journey to the hidden Swordsmith Village to repair the Nichirin Blade, facing lethal Upper Rank demons alongside the Mist and Love Hashiras.",
    bgImage: "/images/categories/anime-cover.jpg",
    youtubeId: "a9tq0aS5Zu8",
    category: "anime",
    franchise: "Demon Slayer",
    rating: 4.9
  };

  // Trending rail items
  const trendingItems = [
    {
      title: "Solo Leveling",
      category: "Anime",
      badge: "#1 Trending",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/40",
      image: "/images/characters/char-4.jpg",
      target: { view: 'category', categoryId: 'anime' }
    },
    {
      title: "Honkai: Star Rail",
      category: "Gaming",
      badge: "Version 2.3",
      badgeClass: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800/40",
      image: "/images/gaming/honkai-star-rail.png",
      target: { view: 'category', categoryId: 'gaming' }
    },
    {
      title: "Avengers: Secret Wars",
      category: "Movies",
      badge: "Multiverse Saga",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40",
      image: "/images/characters/char-14.jpg",
      target: { view: 'category', categoryId: 'movies' }
    },
    {
      title: "Stranger Things 5",
      category: "TV Shows",
      badge: "Final Season",
      badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/40",
      image: "/images/characters/char-16.jpg",
      target: { view: 'category', categoryId: 'tvshows' }
    }
  ];

  // Upcoming Releases Badges
  const upcomingReleases = [
    { day: "31", month: "OCT", title: "Jujutsu Kaisen S3", cat: "Anime" },
    { day: "07", month: "NOV", title: "Arcane Season 2", cat: "TV Shows" },
    { day: "14", month: "DEC", title: "GTA VI Preview", cat: "Gaming" },
    { day: "21", month: "JAN", title: "Spider-Verse 3", cat: "Movies" }
  ];

  const popularChars = characters.slice(0, 7);
  const featuredTrailers = trailers.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section & Trending Rail */}
      <section className="relative px-4 sm:px-6 pt-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Spotlight (8 Columns) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden min-h-[440px] sm:min-h-[500px] border border-slate-200/90 dark:border-zinc-800 flex flex-col justify-end p-6 sm:p-10 shadow-xl group">
            {/* Background Image with Neutral Legibility Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroItem.bgImage}
                alt={heroItem.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 space-y-4 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Featured Universe</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 text-white font-bold text-xs backdrop-blur-md border border-white/20">
                  Anime Spotlight
                </span>
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/15">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{heroItem.rating}</span>
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  {heroItem.title}
                </h1>
                <h2 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 font-display">
                  {heroItem.subtitle}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg">
                {heroItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveVideo({ youtubeId: heroItem.youtubeId, title: `${heroItem.title}: ${heroItem.subtitle}` })}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-900/30 transform hover:scale-[1.02] transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={() => navigateTo('category', { categoryId: 'anime' })}
                  className="px-5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <span>Explore Universe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => toggleBookmark(heroItem)}
                  className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                    isBookmarked(heroItem.id)
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'bg-black/50 border-white/20 text-white hover:bg-black/70'
                  }`}
                  title="Bookmark feature"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(heroItem.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Rail: Trending Now & Upcoming Releases (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* Trending Now Box */}
            <div className="flex-1 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-5 shadow-sm dark:shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-zinc-800 pb-2.5">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span>Trending Across Fandoms</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">LIVE RANKING</span>
              </div>

              <div className="space-y-2.5">
                {trendingItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateTo(item.target.view, { categoryId: item.target.categoryId })}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 border border-slate-100 dark:border-zinc-800 cursor-pointer transition-all group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-200 dark:bg-zinc-800 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${item.badgeClass}`}>
                          {item.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors truncate mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Releases Strip */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-4 shadow-sm dark:shadow-md">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-zinc-800 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Upcoming Premieres</span>
                </h3>
                <button
                  onClick={() => navigateTo('events')}
                  className="text-[11px] text-rose-600 dark:text-rose-400 hover:underline font-bold"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {upcomingReleases.map((rel, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors cursor-pointer group"
                    onClick={() => navigateTo('trailers')}
                  >
                    <span className="block text-base font-black text-slate-900 dark:text-white font-mono leading-none">
                      {rel.day}
                    </span>
                    <span className="block text-[9px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest mt-0.5">
                      {rel.month}
                    </span>
                    <span className="block text-[10px] font-semibold text-slate-700 dark:text-zinc-300 truncate mt-1 group-hover:text-cyan-600">
                      {rel.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Fandom Categories Grid */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 text-[10px] font-bold uppercase tracking-wider">
                7 Core Fandom Hubs
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              <span>Explore Fandom Universes</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1 max-w-xl">
              Choose your universe to dive into official trailers, in-depth articles, character rosters, and gear.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const IconComp = categoryIconMap[cat.id] || Sparkles;
            return (
              <div
                key={cat.id}
                onClick={() => navigateTo('category', { categoryId: cat.id })}
                className="group p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-slate-100 dark:border-zinc-700">
                      {cat.itemCount} items
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-1.5 line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 dark:text-zinc-500 text-[11px]">
                    Open Catalog
                  </span>
                  <span
                    className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    style={{ color: cat.color }}
                  >
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* 8th Box: All Fandoms Directory Pop-up Trigger */}
          <div
            onClick={() => setIsAllFandomsOpen(true)}
            className="group p-5 rounded-3xl bg-gradient-to-br from-white via-white to-rose-50/60 dark:from-zinc-900 dark:via-zinc-900 dark:to-purple-950/30 border border-dashed border-rose-300/90 dark:border-purple-500/40 hover:border-rose-500 dark:hover:border-purple-400 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 text-white">
                  <Layers className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-purple-300 bg-rose-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-purple-800/50">
                  All 7 Hubs
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors flex items-center gap-1.5">
                <span>View All Fandoms</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-1.5 line-clamp-2">
                Browse and jump into any of the 7 cultural universes from an interactive directory pop-up.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400 dark:text-zinc-500 text-[11px]">
                Interactive Directory
              </span>
              <span className="font-bold flex items-center gap-1 text-rose-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Open All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              Journalism & Lore
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Featured Articles & Analysis
            </h2>
          </div>
          <button
            onClick={() => navigateTo('category', { categoryId: 'anime' })}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-500 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => navigateTo('article', { articleId: art.id })}
              className="group rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                <img
                  src={art.thumbnail}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase text-white">
                  {art.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-medium text-slate-200">
                  {art.readTime}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span>By {art.author}</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    Read Story &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Media Hub Clips & Trailers */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Media Hub Spotlight
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Official Trailers & Teasers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('trailers')}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1"
          >
            <span>All Trailers</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTrailers.map((trl) => (
            <div
              key={trl.id}
              onClick={() => setActiveVideo({ youtubeId: trl.youtubeId, title: trl.title })}
              className="group rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 overflow-hidden cursor-pointer transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                <img
                  src={trl.thumbnail}
                  alt={trl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase text-white">
                  {trl.category}
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {trl.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-1">
                  {trl.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Characters Avatar Strip */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
              Character Roster
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Popular Characters & Icons
            </h2>
          </div>
          <button
            onClick={() => navigateTo('characters')}
            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:text-pink-500 flex items-center gap-1"
          >
            <span>View Full Roster</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {popularChars.map((char) => (
            <div
              key={char.id}
              onClick={() => navigateTo('characters', { targetCharacterId: char.id })}
              className="group flex flex-col items-center text-center p-3.5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 hover:border-pink-300 dark:hover:border-zinc-700 cursor-pointer transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-rose-500 to-pink-500 shadow-md group-hover:scale-105 transition-transform mb-2">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors line-clamp-1">
                {char.name}
              </h4>
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 truncate max-w-[100px] font-medium">
                {char.series}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Merchandise & Streetwear (Spotlighting Hoodies & Apparel) */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 text-[10px] font-bold uppercase tracking-wider">
                Official Fan Store
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Hoodies, Jackets & Collectibles
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
              Heavyweight embroidered hoodies, varsity letterman jackets, and authentic fan collectibles.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('merchandise')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-900/10 flex items-center gap-1.5 transition-all transform hover:scale-105"
            >
              <span>Explore All Hoodies & Gear</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {merchandise
            .filter((m) => m.subType === 'Hoodie' || m.subType === 'Jacket')
            .slice(0, 4)
            .map((item) => (
              <MerchandiseCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      {/* Global Event Highlights */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Conventions & Meetups
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Upcoming Event Highlights
            </h2>
          </div>
          <button
            onClick={() => navigateTo('events')}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1"
          >
            <span>All 21+ Events</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.slice(0, 3).map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* All Fandoms Directory Pop-up Modal */}
      {isAllFandomsOpen && typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-backdrop-fade cursor-pointer"
              onClick={closeAllFandomsModal}
              aria-label="Close all fandoms modal"
            />

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-2xl shadow-black/50 animate-modal-pop flex flex-col"
            >
              <div className="relative p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display leading-tight">
                      All Fandom Universes
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Select a fandom to explore official trailers, characters, articles, and gear.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-60">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={fandomSearchQuery}
                      onChange={(e) => setFandomSearchQuery(e.target.value)}
                      placeholder="Search universes..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={closeAllFandomsModal}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                    title="Close (Escape)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories
                    .filter((cat) => {
                      if (!fandomSearchQuery.trim()) return true;
                      const q = fandomSearchQuery.toLowerCase();
                      return (
                        cat.name.toLowerCase().includes(q) ||
                        cat.tagline?.toLowerCase().includes(q) ||
                        cat.subTags?.some((t) => t.toLowerCase().includes(q))
                      );
                    })
                    .map((cat) => {
                      const IconComp = categoryIconMap[cat.id] || Sparkles;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => {
                            navigateTo('category', { categoryId: cat.id });
                            closeAllFandomsModal();
                          }}
                          className="group relative rounded-2xl bg-slate-50/70 dark:bg-zinc-950/70 border border-slate-200/80 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-600 p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                              >
                                <IconComp className="w-5 h-5" />
                              </div>
                              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-zinc-800">
                                {cat.itemCount} items
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {cat.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                              {cat.tagline}
                            </p>

                            {cat.subTags && cat.subTags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {cat.subTags.slice(0, 3).map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-slate-200/70 dark:border-zinc-800 text-slate-600 dark:text-slate-400"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-2.5 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                            <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                              Explore Realm
                            </span>
                            <span
                              className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                              style={{ color: cat.color }}
                            >
                              <span>Enter</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {categories.filter((cat) => {
                  if (!fandomSearchQuery.trim()) return true;
                  const q = fandomSearchQuery.toLowerCase();
                  return (
                    cat.name.toLowerCase().includes(q) ||
                    cat.tagline?.toLowerCase().includes(q) ||
                    cat.subTags?.some((t) => t.toLowerCase().includes(q))
                  );
                }).length === 0 && (
                  <div className="py-12 text-center text-slate-500 dark:text-zinc-400">
                    <p className="text-sm">No universes match "{fandomSearchQuery}"</p>
                    <button
                      onClick={() => setFandomSearchQuery('')}
                      className="mt-2 text-xs text-rose-500 font-bold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>

              <div className="p-3 sm:px-6 bg-slate-50 dark:bg-zinc-950 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                <span className="text-[11px]">
                  Click any universe to navigate.
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                  ESC to close
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
