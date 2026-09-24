# FandomVerse: Global Entertainment & Pop Culture Universe
> **The Premier Unified Pop Culture Platform**  
> **Universes:** Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga  
> **Architecture:** 100% Client-Side Frontend-Only Single Page Application (SPA)

---

## 🌟 Overview

**FandomVerse** is an interactive, media-rich Single Page Application (SPA) engineered to unify fan communities across **7 core universes**:
1. **Anime** (Demon Slayer, Jujutsu Kaisen, Attack on Titan, Solo Leveling, Frieren)
2. **Gaming** (Genshin Impact, Elden Ring, Cyberpunk 2077, Final Fantasy VII, Honkai: Star Rail)
3. **Movies** (Spider-Man: Across the Spider-Verse, Dune: Part Two, The Batman, Oppenheimer)
4. **TV Shows** (Stranger Things, Arcane, The Last of Us, House of the Dragon, Severance)
5. **K-Pop** (BTS, BLACKPINK, NewJeans, Stray Kids, LE SSERAFIM)
6. **Comics** (Spider-Man, Batman, X-Men, Invincible, The Sandman)
7. **Manga** (Chainsaw Man, Berserk, One Piece, Spy x Family, Blue Lock)

Built with a 100% serverless, zero-backend architecture. All content is organized in clean, decoupled JSON datasets rendered with instantaneous client-side state management.

---

## 🎨 Dual Bright & Obsidian Theme System

- **Light Mode (Primary)**: Crisp porcelain backdrop (`#f8fafc`), pure-white elevated cards (`#ffffff`), radiant rose/purple/cyan accents, and high-contrast typography (`#0f172a`).
- **Dark Mode**: Sleek neutral obsidian and zinc (`#09090b`, `#141416`, `#18181b`), eliminating murky navy blue for a clean modern entertainment aesthetic.

---

## 🚀 Key Features

- 🧥 **Fan Clothing & Merchandise Store**: Authentic streetwear hoodies (Demon Slayer, Sukuna Malevolent Shrine, BTS, Arcane Ekko), varsity jackets, and collectibles with real-time size selection (`XS` to `2XL`), cart calculation, and client-side checkout simulation.
- 🔢 **Live Visitor Counter**: 7-digit retro odometer display persistent across visits via browser `localStorage`.
- ⏰ **Real-Time Clock**: Live digital clock displaying local date and formatted time with AM/PM updates every second.
- 🔍 **Global Real-Time Search**: Search modal accessible from all pages (`Ctrl + K` or magnifying glass) with instant multi-filtering by category and content type.
- 🖼️ **Image Lightbox & Carousel**: Full-screen modal lightbox for browsing high-resolution category visual galleries without leaving the page.
- 🎬 **Media Hub & Audio Player**: YouTube trailer embeds + persistent bottom audio player with progress scrubber for OSTs and K-Pop tracks.
- 🧑‍🎤 **Character Profiles**: 35+ character profiles across all 7 universes with biographies, power traits, quotes, and full bio modals.
- 📅 **Events Calendar**: 21+ global fandom gatherings, expos, and watch parties with upcoming vs. past filters.
- 🍿 **Trailers Hub**: Dedicated trailer showcase filterable by release status (*Upcoming Releases* vs *Recently Released*).
- 🤖 **Interactive AI-Powered Assistant**: Built-in virtual guide (`FandomBot`) with quick-prompt pills, category deep linking, and search recommendations.
- 🔖 **Client Bookmarking & Session Notes**:
  - `localStorage` for saved articles, characters, media, and events.
  - `sessionStorage` for private personal notes.
  - **Export Bookmarks**: Instant download of saved bookmarks as JSON or TXT.
- 🗺️ **Contact & Interactive GPS Map**: Responsive contact form + interactive embedded location map with GPS pinpoint coordinates (`34.0407° N, 118.2698° W`).
- 🔐 **Simulated Authentication**: Instant demo sign-in and account creation modal.
- 🧭 **Interactive Archetype Quiz**: Fun 5-question fandom quiz recommending your pop culture universe.

---

## 🛠️ Quick Start & Running the Project

### One-Click Launch (Windows)
Double-click `start_website.bat` in the root folder. It will launch the local development server and open your default browser directly at `http://localhost:5173/`.

### Manual CLI Launch
```powershell
# 1. Install dependencies
npm.cmd install

# 2. Start development server
npm.cmd run dev

# 3. Production build
npm.cmd run build
npm.cmd run preview
```

---

## 📂 Project Structure

```
fandom_verse/
├── start_website.bat        # One-click launcher script
├── public/
│   └── data/
│       ├── categories.json  # Category definitions, colors, sub-tags
│       ├── anime.json       # Anime catalog & franchise lore
│       ├── gaming.json      # Gaming catalog & titles
│       ├── movies.json      # Blockbusters & films
│       ├── tvshows.json     # TV series & streaming shows
│       ├── kpop.json        # Groups, discography, fandoms
│       ├── comics.json      # Graphic novels & comics
│       ├── manga.json       # Manga series & volumes
│       ├── characters.json  # 35+ character profiles
│       ├── events.json      # 21+ global fandom events
│       ├── merchandise.json # 20+ hoodies, jackets & gear
│       ├── articles.json    # Feature articles & analysis
│       ├── trailers.json    # Curated official trailers
│       └── chatbot_kb.json  # Rule-based FAQ & navigation
├── src/
│   ├── components/          # Reusable UI cards, modals, navigation
│   ├── pages/               # 10 comprehensive SPA views
│   ├── context/             # Global client state management
│   ├── App.jsx              # Main SPA router & overlay provider
│   └── index.css            # Tailwind directives & theme variables
├── package.json
├── tailwind.config.js
└── vite.config.js
```
