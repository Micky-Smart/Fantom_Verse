import React from 'react';
import { useFandom } from '../context/FandomContext';
import { Sparkles, Heart, Shield, Code, Globe, HelpCircle, Mail } from 'lucide-react';

export const Footer = () => {
  const { categories, navigateTo } = useFandom();

  return (
    <footer className="w-full bg-slate-900 dark:bg-zinc-950 border-t border-slate-800 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-display">
                FANDOM<span className="text-white">VERSE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              The premier centralized portal uniting fan communities across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga. Built for passionate fans worldwide.
            </p>
          </div>

          {/* Fandom Categories */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3 font-display">
              Category Hubs
            </h4>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => navigateTo('category', { categoryId: c.id })}
                    className="hover:text-purple-300 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span>{c.name} Hub</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Features */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3 font-display">
              Explore Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('trailers')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Media & Trailers Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('characters')}
                  className="hover:text-purple-300 transition-colors"
                >
                  35+ Character Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('events')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Events & Conventions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('merchandise')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Merchandise Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('bookmarks')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Bookmarks & Session Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Documentation & Organization */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs mb-3 font-display">
              Information
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>About FandomVerse</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact & GPS Map</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                <span>The Global Fandom Platform</span>
              </li>
              <li className="text-[11px] text-slate-500">
                <span>7 Iconic Pop Culture Universes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 FandomVerse. All rights reserved. Created for fans worldwide. All trademarks belong to respective copyright holders.</p>
          <div className="flex items-center gap-2">
            <span>Powered by React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
