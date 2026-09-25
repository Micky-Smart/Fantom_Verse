import React from 'react';
import { useFandom } from '../context/FandomContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  Calendar,
  Clock,
  User,
  Bookmark,
  Share2,
  Quote,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ArticleDetailPage = () => {
  const {
    activeArticleId,
    articles,
    navigateTo,
    isBookmarked,
    toggleBookmark,
    sessionNotes,
    setNote
  } = useFandom();

  const article = articles.find(a => a.id === activeArticleId) || articles[0];
  const bookmarked = article ? isBookmarked(article.id) : false;
  const currentNote = article ? (sessionNotes[article.id] || '') : '';

  if (!article) return null;

  // Find related articles
  const relatedArticles = articles.filter(a => article.relatedIds?.includes(a.id) || (a.category === article.category && a.id !== article.id)).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="pb-20 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Category Hubs', onClick: () => navigateTo('home') },
          { label: `${article.category.toUpperCase()}`, onClick: () => navigateTo('category', { categoryId: article.category }) },
          { label: article.title }
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-600/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-500/40 text-xs font-bold uppercase tracking-wider">
              {article.category} Universe
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Exclusive Deep-Dive
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {article.summary}
          </p>

          {/* Meta & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{article.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{article.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(article)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  bookmarked
                    ? 'bg-pink-600 border-pink-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 dark:hover:text-white border-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-purple-500/20 shadow-xl">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
          {article.content?.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Pull Quote */}
          {article.quote && (
            <div className="p-6 my-8 rounded-2xl bg-purple-50 dark:bg-zinc-900 border-l-4 border-purple-500 border-y border-r border-purple-200 dark:border-zinc-800">
              <div className="flex items-start gap-3">
                <Quote className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <p className="text-base sm:text-lg italic font-semibold text-purple-950 dark:text-purple-100 font-display">
                  "{article.quote}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Personal Session Note */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Personal Fan Notes (Session Only)</span>
            </h4>
            <span className="text-[10px] text-purple-700 dark:text-purple-300 font-mono bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/30">
              SessionStorage
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Notes written here remain private and active during your current browsing session.
          </p>
          <textarea
            rows={3}
            value={currentNote}
            onChange={(e) => setNote(article.id, e.target.value)}
            placeholder="Jot down fan theories, favorite quotes, or thoughts on this article..."
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-purple-500 resize-none"
          />
          {currentNote && (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">
              ✓ Note automatically synced to SessionStorage
            </span>
          )}
        </div>

        {/* Related Content Suggestions */}
        <div className="pt-10 border-t border-slate-200 dark:border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Related Content Suggestions
            </h3>
            <button
              onClick={() => navigateTo('category', { categoryId: article.category })}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 flex items-center gap-1"
            >
              <span>Back to {article.category} Hub</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateTo('article', { articleId: rel.id })}
                className="group rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-purple-500/40 p-4 cursor-pointer transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                </div>
                <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-3 flex items-center gap-1">
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
