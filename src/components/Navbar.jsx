import React, { useState } from 'react';
import { useFandom } from '../context/FandomContext';
import { RealTimeClock } from './RealTimeClock';
import { VisitorCounter } from './VisitorCounter';
import {
  Sparkles,
  Search,
  Bookmark,
  ShoppingBag,
  User,
  Menu,
  X,
  Tv,
  Gamepad2,
  Film,
  Tv2,
  Music,
  BookOpen,
  BookMarked,
  FilmIcon,
  Calendar,
  Users2,
  HelpCircle,
  Mail,
  ChevronDown,
  Sun,
  Moon
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

export const Navbar = () => {
  const {
    currentView,
    activeCategoryId,
    navigateTo,
    categories,
    bookmarks,
    cartCount,
    setIsSearchOpen,
    setIsCartOpen,
    setIsAuthOpen,
    setAuthMode,
    user,
    logoutUser,
    setIsQuizOpen,
    themeMode,
    toggleTheme
  } = useFandom();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    navigateTo('category', { categoryId: catId });
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-md border-b border-slate-200 dark:border-purple-900/30 text-slate-800 dark:text-slate-100 transition-colors duration-300 shadow-sm">
      {/* Top Utility Bar (Clock, Visitor Counter, Quick Notice) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 text-xs bg-slate-100/90 dark:bg-[#05080e] border-b border-slate-200/80 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-6">
          <RealTimeClock compact={false} />
          <VisitorCounter compact={false} />
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <button
            onClick={() => navigateTo('about')}
            className="hover:text-rose-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 font-medium"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>About Us</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            onClick={() => navigateTo('contact')}
            className="hover:text-rose-600 dark:hover:text-purple-300 transition-colors flex items-center gap-1 font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>HQ & GPS Location</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none min-w-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-400 p-0.5 shadow-md group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[10px] flex items-center justify-center transition-colors">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col min-w-0">
                <span className="font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-500 font-display">
                  FANDOM<span className="text-slate-900 dark:text-white">VERSE</span>
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'home'
                  ? 'bg-rose-50 dark:bg-purple-600/20 text-rose-700 dark:text-purple-300 border border-rose-200 dark:border-purple-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Home
            </button>

            {/* Categories Dropdown with Cultural Differentiation */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  currentView === 'category'
                    ? 'bg-rose-50 dark:bg-purple-600/20 text-rose-700 dark:text-purple-300 border border-rose-200 dark:border-purple-500/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <span>7 Fandom Hubs</span>
                <ChevronDown className="w-4 h-4 text-rose-500 dark:text-purple-400" />
              </button>

              {isCategoryDropdownOpen && (
                <div
                  onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-2.5 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-1.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span>Distinct Cultural Universes</span>
                    <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400">7 CULTURES</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pt-1.5">
                    {categories.map((cat) => {
                      const IconComp = categoryIconMap[cat.id] || Sparkles;
                      const isActive = currentView === 'category' && activeCategoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition-all ${
                            isActive
                              ? 'bg-slate-100 dark:bg-purple-600/30 font-bold shadow-sm'
                              : 'hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base shadow-sm"
                            style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                          >
                            <span>{cat.cultureFlag || <IconComp className="w-4 h-4" />}</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="leading-tight font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{cat.name}</span>
                              <span className="text-[10px] font-medium text-slate-400 truncate">({cat.culturalAura || cat.subTags[0]})</span>
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {cat.culture || cat.tagline}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-Category Features Nav */}
            <button
              onClick={() => navigateTo('trailers')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'trailers'
                  ? 'bg-rose-50 dark:bg-purple-600/20 text-rose-700 dark:text-purple-300 border border-rose-200 dark:border-purple-500/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Trailers
            </button>

            <button
              onClick={() => navigateTo('characters')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'characters'
                  ? 'bg-rose-50 dark:bg-purple-600/20 text-rose-700 dark:text-purple-300 border border-rose-200 dark:border-purple-500/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Characters
            </button>

            <button
              onClick={() => navigateTo('events')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'events'
                  ? 'bg-rose-50 dark:bg-purple-600/20 text-rose-700 dark:text-purple-300 border border-rose-200 dark:border-purple-500/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigateTo('merchandise')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                currentView === 'merchandise'
                  ? 'bg-amber-50 dark:bg-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <span>Hoodies & Merch</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-white font-black">
                NEW
              </span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-500/10 hover:bg-amber-200 dark:hover:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 transition-all shadow-sm"
              title="Discover Your Fandom Archetype"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Archetype Quiz</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Bright Light / Dark Neon Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-sm"
              title={themeMode === 'light' ? 'Switch to Neon Dark Mode' : 'Switch to Radiant Cultural Light Mode'}
            >
              {themeMode === 'light' ? (
                <Moon className="w-4 h-4 text-purple-600" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
              )}
            </button>

            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-rose-400 dark:hover:border-purple-500/40 transition-all text-xs"
              title="Search FandomVerse (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-rose-500 dark:text-purple-400" />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-mono border border-slate-200 dark:border-transparent">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Icon */}
            <button
              onClick={() => navigateTo('bookmarks')}
              className={`relative p-2.5 rounded-xl border transition-all ${
                currentView === 'bookmarks'
                  ? 'bg-rose-100 dark:bg-pink-600/20 border-rose-300 dark:border-pink-500/40 text-rose-600 dark:text-pink-300'
                  : 'bg-slate-100 dark:bg-slate-900/80 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-white'
              }`}
              title="Saved Bookmarks & Notes"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white transition-all"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-purple-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Dummy Auth */}
            {user.loggedIn ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={logoutUser}
                  title="Click to sign out (Simulated)"
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-purple-500/30 hover:border-rose-400 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full bg-rose-100 dark:bg-purple-900/50 border border-rose-400"
                  />
                  <span className="hidden lg:inline text-xs font-semibold text-slate-800 dark:text-purple-200">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthOpen(true);
                  }}
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setIsAuthOpen(true);
                  }}
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-500 hover:opacity-95 text-white shadow-md shadow-rose-500/20 transition-all transform hover:scale-[1.02]"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Burger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 xl:hidden"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 px-4 py-4 space-y-3 transition-colors">
          {/* Mobile Clock & Visitor Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5">
            <RealTimeClock compact={true} />
            <VisitorCounter compact={true} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                navigateTo('trailers');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <FilmIcon className="w-4 h-4 text-rose-500" />
              <span>Trailers</span>
            </button>
            <button
              onClick={() => {
                navigateTo('characters');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <Users2 className="w-4 h-4 text-purple-500" />
              <span>Characters</span>
            </button>
            <button
              onClick={() => {
                navigateTo('events');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <Calendar className="w-4 h-4 text-cyan-500" />
              <span>Events</span>
            </button>
            <button
              onClick={() => {
                navigateTo('merchandise');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Merch Store</span>
            </button>
            <button
              onClick={() => {
                setIsQuizOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-sm font-bold text-amber-700 dark:text-amber-300"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Archetype Quiz</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Explore 7 Distinct Fandom Cultures
            </span>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-xs text-left hover:border-rose-400"
                  >
                    <span>{cat.cultureFlag || '✨'}</span>
                    <span className="truncate font-semibold text-slate-800 dark:text-slate-200">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
