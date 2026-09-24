import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Sparkles,
  Shield,
  Layers,
  Code2,
  Users,
  Award,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  Zap
} from 'lucide-react';

export const AboutPage = () => {
  const teamMembers = [
    {
      name: "Alex Thorne",
      role: "Lead Frontend Architect & UI/UX Designer",
      bio: "Crafted the cyberpunk dark theme, responsive grid systems, and glassmorphic micro-animations.",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%236366f1'/><text x='50' y='60' font-size='38' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>AT</text></svg>"
    },
    {
      name: "Sara Hayashi",
      role: "Data Systems & Knowledge Base Curator",
      bio: "Compiled and structured the 7 JSON universe datasets, rule-based chatbot Q&A, and character lore.",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23ec4899'/><text x='50' y='60' font-size='38' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>SH</text></svg>"
    },
    {
      name: "Darius Miller",
      role: "Interactive Features & State Engineer",
      bio: "Implemented the LocalStorage bookmarks, session-only notes, client-side billing cart, and audio engine.",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2310b981'/><text x='50' y='60' font-size='38' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>DM</text></svg>"
    }
  ];

  const platformHighlights = [
    { title: "Zero Latency Client Architecture", desc: "Pure client-side Single Page Application with instant transitions between universes and zero page reloads." },
    { title: "Decoupled JSON Data Model", desc: "Structured, highly optimized JSON datasets driving character archives, articles, trailers, and events." },
    { title: "Smart Storage Separation", desc: "Persistent bookmarks & visitor counter in LocalStorage; private personal notes isolated to your active browsing session." },
    { title: "Fully Adaptive Layout", desc: "Fluid, responsive interface beautifully crafted for mobile smartphones, tablets, laptops, and wide monitors." },
    { title: "Dynamic Client-Side Store", desc: "Interactive cart calculating subtotals, local tax, and grand totals instantly in pure JavaScript." },
    { title: "Virtual Guide AI (FandomBot)", desc: "Intelligent rule-based virtual companion offering lore advice, quick filters, and direct shortcuts." }
  ];

  return (
    <div className="pb-20 space-y-12">
      <Breadcrumbs items={[{ label: 'About FandomVerse' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-600/20 border border-purple-300 dark:border-purple-500/40 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>The Premier Fandom Destination</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            About the FandomVerse Initiative
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Bridging fragmented fan communities into one unified, visually immersive platform across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga.
          </p>
        </div>

        {/* Project Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-500/20 p-6 sm:p-8 space-y-3 shadow-md dark:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              The Challenge: Fragmented Fan Spaces
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Information Fragmentation in Fandom Communities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Fandom culture is one of the most vibrant phenomenons online. However, information is heavily scattered across fragmented wikis, social media, ticketing platforms, and separate merchandise stores. Fans are forced to jump across dozens of sites simply to stay updated on a single franchise.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-500/20 p-6 sm:p-8 space-y-3 shadow-md dark:shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              The Vision: A Centralized Fan Universe
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              The Centralized FandomVerse Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              FandomVerse eliminates context switching by creating an engaging, media-rich centralized hub. Visitors can explore trailers, read analytical articles, browse character profiles, save events to their schedule, preview collectibles with simulated billing, and consult an AI assistant—all within a unified, high-speed platform.
            </p>
          </div>
        </div>

        {/* Technical Architecture & Platform Highlights */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-10 shadow-lg dark:shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                High-Performance Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                Platform Architecture & Features
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 text-xs font-bold font-mono">
              ⚡ FAST CLIENT-SIDE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack Details */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md dark:shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Technology Stack & Hardware Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">Frontend Layer</span>
              <p className="text-slate-900 dark:text-white font-semibold">React 18 + Vite</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Single Page Application (SPA)</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">Styling & Culture</span>
              <p className="text-slate-900 dark:text-white font-semibold">Tailwind CSS 3.4</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Dual Bright & Dark Mode palettes</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-pink-600 dark:text-pink-400">Data Architecture</span>
              <p className="text-slate-900 dark:text-white font-semibold">Decoupled JSON Files</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Async fetch() with memory caching</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">Browser Storage</span>
              <p className="text-slate-900 dark:text-white font-semibold">LocalStorage + SessionStorage</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Strict session lifetime isolation</p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Development Team
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Meet the Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-5 text-center space-y-3 hover:border-purple-400 dark:hover:border-purple-500/40 transition-colors shadow-sm"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-md">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{member.name}</h4>
                  <span className="text-xs text-purple-600 dark:text-purple-300 font-medium block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
