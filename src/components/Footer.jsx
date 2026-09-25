import React from 'react';
import { useFandom } from '../context/FandomContext';
import { Heart, Shield, Code, Globe, HelpCircle, Mail } from 'lucide-react';

export const Footer = () => {
  const { categories, navigateTo } = useFandom();

  return (
    <footer className="w-full bg-slate-900 dark:bg-zinc-950 border-t border-slate-800 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <div className="flex items-center gap-2.5 group">
              <img
                src="/images/expo/img.jpg"
                alt="Fandom Hub"
                className="w-12 h-12 rounded-xl object-cover shadow-md"
              />
              <span className="font-black text-lg tracking-tight font-display whitespace-nowrap">
                <span className="text-rose-400 group-hover:text-cyan-400 transition-colors">Fandom</span><span className="text-white">Hub</span>
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
                    className="hover:text-purple-300 transition-colors flex items-center gap-2 text-left min-w-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="min-w-0 break-words">{c.name} Hub</span>
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
                    className="hover:text-purple-300 transition-colors text-left"
                >
                  Media & Trailers Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('characters')}
                    className="hover:text-purple-300 transition-colors text-left"
                >
                  35+ Character Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('events')}
                    className="hover:text-purple-300 transition-colors text-left"
                >
                  Events & Conventions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('merchandise')}
                    className="hover:text-purple-300 transition-colors text-left"
                >
                  Merchandise Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('bookmarks')}
                    className="hover:text-purple-300 transition-colors text-left"
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
                    className="hover:text-purple-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>About FandomVerse</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                    className="hover:text-purple-300 transition-colors flex items-center gap-1.5 text-left"
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
        <div className="pt-6 sm:pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-4 text-[11px] text-slate-500">
          <p className="text-center sm:text-left leading-relaxed max-w-2xl">© 2026 FandomVerse. All rights reserved. Created for fans worldwide. All trademarks belong to respective copyright holders.</p>
          <div className="flex items-center gap-2">
            <span>Powered by React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
