import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useFandom } from "../context/FandomContext";
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
  Zap,
} from "lucide-react";

export const AboutPage = () => {
  const teamMembers = [
    {
      name: "Timileyin",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/timileyin.jpg",
      position: "center 42%",
    },
    {
      name: "Michael",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/micheal.jpg",
      position: "center 38%",
    },
    {
      name: "Dabira",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/dabira.jpg",
      position: "center 22%",
    },
    {
      name: "Joshua",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/joshua.jpg",
      position: "center 25%",
    },
    {
      name: "Ayomide",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/ayomide.jpg",
      position: "center 35%",
    },
    {
      name: "Bolaji",
      role: "Creator",
      bio: "Core contributor and content curator.",
      avatar: "/images/passport/bolaji.jpg",
      position: "center 25%",
    },
  ];

  const platformHighlights = [
    {
      title: "Zero Latency Client Architecture",
      desc: "Pure client-side Single Page Application with instant transitions between universes and zero page reloads.",
    },
    {
      title: "Decoupled JSON Data Model",
      desc: "Structured, highly optimized JSON datasets driving character archives, articles, trailers, and events.",
    },
    {
      title: "Smart Storage Separation",
      desc: "Persistent bookmarks & visitor counter in LocalStorage; private personal notes isolated to your active browsing session.",
    },
    {
      title: "Fully Adaptive Layout",
      desc: "Fluid, responsive interface beautifully crafted for mobile smartphones, tablets, laptops, and wide monitors.",
    },
    {
      title: "Dynamic Client-Side Store",
      desc: "Interactive cart calculating subtotals, local tax, and grand totals instantly in pure JavaScript.",
    },
    {
      title: "Virtual Guide AI (FandomBot)",
      desc: "Intelligent rule-based virtual companion offering lore advice, quick filters, and direct shortcuts.",
    },
  ];

  const { navigateTo } = useFandom();

  return (
    <div className="pb-20 space-y-12">
      <Breadcrumbs items={[{ label: "About FandomVerse" }]} />

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
            Bridging fragmented fan communities into one unified, visually
            immersive platform across Anime, Gaming, Movies, TV Shows, K-Pop,
            Comics, and Manga.
          </p>
        </div>

        {/* Feature Showcase (two-column) */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md dark:shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                What We Offer
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                A unified home for fandoms
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                FandomVerse brings trailers, articles, character bios, event
                listings and merch previews into a single, fast client
                experience. Explore detailed lore, save favorites, and interact
                with an intelligent assistant—all without leaving your browser.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Instant Client Navigation
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Seamless SPA transitions with zero page reloads.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      Rich Media Hub
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Trailers, galleries and interactive previews in one place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() =>
                    navigateTo("category", { categoryId: "anime" })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700"
                >
                  Explore the Hub
                </button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-pink-500 p-1">
              <div
                className="bg-white dark:bg-zinc-900 rounded-lg p-6 h-full flex items-center justify-center"
                style={{ minHeight: 220 }}
              >
                <div className="text-center w-full">
                  <img
                    src="/images/categories/anime-cover.jpg"
                    alt="FandomVerse preview"
                    className="w-full h-40 object-cover rounded-lg mx-auto"
                  />
                  <p className="mt-4 text-xs text-slate-700 dark:text-slate-300">
                    Visual preview area — representative category cover.
                  </p>
                </div>
              </div>
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
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-md">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ objectPosition: member.position || 'center' }}
                    className="w-full h-full object-cover rounded-full bg-slate-100 dark:bg-zinc-800"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%236366f1'/><text x='50' y='60' font-size='36' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'>${member.name.slice(0, 2).toUpperCase()}</text></svg>`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h4>
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
