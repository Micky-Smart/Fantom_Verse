import React, { useState, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { Sparkles, X, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const quizQuestions = [
  {
    question: "When faced with an impossible battle, what is your chosen tactic?",
    options: [
      { text: "Unleash my inner breathing style and awaken hidden power with unyielding determination", cat: "anime" },
      { text: "Study boss attack patterns, time my dodge rolls, and execute a flawless parry", cat: "gaming" },
      { text: "Rally an elite squad, deploy high-tech gadgets, and protect the civilian population", cat: "movies" },
      { text: "Unravel the supernatural mystery lurking beneath our quaint small town", cat: "tvshows" },
      { text: "Sync up razor-sharp group choreography and hit every high note under stadium spotlights", cat: "kpop" },
      { text: "Defy fate and push through the pain, brandishing a colossal black iron blade", cat: "manga" }
    ]
  },
  {
    question: "Which aesthetic speaks deepest to your soul?",
    options: [
      { text: "Sakura blossoms drifting over ancient Japanese temples and misty mountains", cat: "anime" },
      { text: "Neon-drenched cyberpunk skylines with soaring flying vehicles and holo-billboards", cat: "gaming" },
      { text: "Cinematic desert dunes under double moons with massive sandworms rising", cat: "movies" },
      { text: "Gothic steampunk towers and glowing Hextech laboratories in Zaun and Piltover", cat: "tvshows" },
      { text: "Vibrant Y2K camcorder retro fashion, custom lightsticks, and arena pyrotechnics", cat: "kpop" },
      { text: "Intricate black-and-white ink hatching capturing raw grit and dramatic double spreads", cat: "manga" }
    ]
  },
  {
    question: "What is your primary superpower or character asset?",
    options: [
      { text: "The Six Eyes and Limitless void cursed energy that bends infinite space", cat: "anime" },
      { text: "Mastery of Elemental reactions and divine Archon polearm strikes", cat: "gaming" },
      { text: "A genius billionaire intellect wrapped in nanotech titanium armor", cat: "movies" },
      { text: "Raw psychic telekinesis capable of closing portals to alternate dimensions", cat: "tvshows" },
      { text: "Unrivaled vocal agility, stage charisma, and global trendsetting influence", cat: "kpop" },
      { text: "Sun God Nika rubber freedom, laughter, and unbreakable will of Conqueror's Haki", cat: "manga" }
    ]
  }
];

const archetypes = {
  anime: {
    title: "The Shonen Awakener",
    category: "anime",
    quote: "Throughout Heaven and Earth, you carve your own legend.",
    match: "Satoru Gojo & Tanjiro Kamado",
    desc: "You possess indomitable spirit, loyalty to your comrades, and an unshakeable belief that limits are meant to be broken.",
    color: "#ec4899"
  },
  gaming: {
    title: "The Sovereign Wanderer",
    category: "gaming",
    quote: "You have conquered the Lands Between and mastered the elements.",
    match: "Raiden Shogun & Cloud Strife",
    desc: "Analytical, tactically sharp, and naturally drawn to expansive open worlds and high-stakes combat loops.",
    color: "#8b5cf6"
  },
  movies: {
    title: "The Multiverse Catalyst",
    category: "movies",
    quote: "You don't follow the canon script. You do your own thing.",
    match: "Miles Morales & Bruce Wayne",
    desc: "A lover of widescreen cinematic spectacles, high moral complexity, and iconic heroic sacrifices.",
    color: "#3b82f6"
  },
  tvshows: {
    title: "The Upside Down Investigator",
    category: "tvshows",
    quote: "Friends don't lie, and no dark secret stays buried forever.",
    match: "Eleven & Jinx",
    desc: "Intensely loyal, fascinated by intricate world lore, and willing to confront terrifying supernatural depths.",
    color: "#06b6d4"
  },
  kpop: {
    title: "The Global Center Star",
    category: "kpop",
    quote: "You command the stage and turn every arena into a sea of light.",
    match: "RM & Jennie Kim",
    desc: "Radiant, trendsetting, and deeply passionate about sonic artistry, choreography, and communal fan energy.",
    color: "#f43f5e"
  },
  manga: {
    title: "The Branded Struggler",
    category: "manga",
    quote: "Struggle, contend, and laugh in the face of impossible destiny!",
    match: "Monkey D. Luffy & Guts",
    desc: "You respect true craftsmanship, patient character development, and raw perseverance against overwhelming odds.",
    color: "#10b981"
  }
};

export const FandomQuizModal = ({ isOpen, onClose }) => {
  const { navigateTo } = useFandom();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (cat) => {
    const nextAnswers = [...answers, cat];
    setAnswers(nextAnswers);

    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate archetype
      const tally = {};
      nextAnswers.forEach(c => {
        tally[c] = (tally[c] || 0) + 1;
      });
      let highestCat = 'anime';
      let highestCount = 0;
      Object.entries(tally).forEach(([k, v]) => {
        if (v > highestCount) {
          highestCount = v;
          highestCat = k;
        }
      });

      const archetypeResult = archetypes[highestCat] || archetypes.anime;
      setResult(archetypeResult);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const currentQ = quizQuestions[currentQIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-backdrop-fade cursor-pointer overflow-y-auto overflow-x-hidden"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg h-auto max-h-[90vh] my-auto bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl p-5 sm:p-8 overflow-y-auto overflow-x-hidden cursor-default animate-modal-pop"
      >
        {/* Glow ambient contained within modal bounds to prevent extra width / horizontal scrolling */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-600/10 dark:bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          title="Close (Escape)"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-purple-400 mb-2.5 pr-11 sm:pr-12">
                <span className="uppercase tracking-widest flex items-center gap-1.5 min-w-0 truncate">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Fandom Archetype Quiz</span>
                </span>
                <span className="font-mono bg-rose-50 dark:bg-purple-950/60 text-rose-600 dark:text-purple-300 px-2.5 py-0.5 rounded-md border border-rose-200/80 dark:border-purple-800/50 flex-shrink-0">
                  {currentQIndex + 1} / {quizQuestions.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display leading-snug pr-8">
              {currentQ.question}
            </h3>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.cat)}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-50 hover:bg-rose-50/50 dark:bg-zinc-800/80 dark:hover:bg-zinc-750 border border-slate-200 dark:border-zinc-700/80 hover:border-rose-400 dark:hover:border-purple-500/50 text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-rose-700 dark:hover:text-white transition-all transform hover:scale-[1.01] flex items-center justify-between group shadow-xs"
                >
                  <span className="pr-3 leading-relaxed flex-1 min-w-0">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-600 to-cyan-500 p-0.5 shadow-xl shadow-purple-900/30 flex items-center justify-center animate-bounce">
              <Trophy className="w-8 h-8 text-white" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500 dark:text-slate-400">
                Your Fandom Archetype
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
                {result.title}
              </h3>
              <p className="text-xs italic text-rose-600 dark:text-purple-300 mt-1">
                "{result.quote}"
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 text-left space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.desc}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>Soulmate Characters:</span>
                <span className="font-bold text-slate-900 dark:text-white">{result.match}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('category', { categoryId: result.category });
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-purple-900/30 hover:opacity-95 flex items-center justify-center gap-1.5 min-w-0"
              >
                <span className="truncate">Enter {result.category.toUpperCase()} Hub</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
