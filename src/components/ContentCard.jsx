import React from 'react';
import { useFandom } from '../context/FandomContext';
import {
  Bookmark,
  Play,
  Images,
  Headphones,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ContentCard = ({ item }) => {
  const {
    isBookmarked,
    toggleBookmark,
    setActiveVideo,
    openLightbox,
    playAudio,
    navigateTo
  } = useFandom();

  const bookmarked = isBookmarked(item.id);

  const handleCardClick = () => {
    if (item.contentType === 'video' || item.contentType === 'releases' || item.mediaUrl || item.youtubeId) {
      let ytId = item.youtubeId;
      if (!ytId && item.mediaUrl) {
        if (item.mediaUrl.includes('embed/')) {
          ytId = item.mediaUrl.split('embed/')[1]?.split('?')[0];
        } else if (item.mediaUrl.includes('v=')) {
          ytId = item.mediaUrl.split('v=')[1]?.split('&')[0];
        } else if (item.mediaUrl.includes('youtu.be/')) {
          ytId = item.mediaUrl.split('youtu.be/')[1]?.split('?')[0];
        }
      }
      if (ytId) {
        setActiveVideo({ youtubeId: ytId, title: item.title });
        return;
      }
    }
    
    if (item.contentType === 'gallery' && item.galleryImages) {
      openLightbox(item.galleryImages, 0, item.title);
    } else if (item.contentType === 'audio') {
      playAudio(item);
    } else if (item.contentType === 'article') {
      navigateTo('article', { articleId: item.id });
    }
  };

  const renderTypeIcon = () => {
    switch (item.contentType) {
      case 'video':
      case 'releases':
        return <Play className="w-3.5 h-3.5 fill-current" />;
      case 'gallery':
        return <Images className="w-3.5 h-3.5" />;
      case 'audio':
        return <Headphones className="w-3.5 h-3.5" />;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="group rounded-3xl bg-white dark:bg-zinc-900 hover:bg-slate-50/80 dark:hover:bg-zinc-850 border border-slate-200/90 dark:border-zinc-800 hover:border-rose-400 dark:hover:border-rose-500/40 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 dark:hover:shadow-black/50">
      {/* Image Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 cursor-pointer" onClick={handleCardClick}>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/images/categories/anime-cover.jpg";
          }}
        />

        {/* Content Type Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-bold uppercase tracking-wider text-rose-300 dark:text-purple-300">
          {renderTypeIcon()}
          <span>{item.contentType}</span>
        </div>

        {/* Bookmark Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(item);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all ${
            bookmarked
              ? 'bg-rose-600 text-white shadow-lg'
              : 'bg-black/60 text-white/80 hover:text-white hover:bg-black/90'
          }`}
          title={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Play Overlay indicator for media */}
        {(item.contentType === 'video' || item.contentType === 'releases' || item.contentType === 'audio') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-rose-600 dark:bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {item.franchise && (
              <span className="text-[10px] font-extrabold text-rose-600 dark:text-pink-400 uppercase tracking-wider">
                {item.franchise}
              </span>
            )}
            {item.tags?.map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-purple-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.date}</span>
          </span>
          <button
            onClick={handleCardClick}
            className="text-rose-600 dark:text-purple-400 hover:underline font-bold flex items-center gap-1 group/btn"
          >
            <span>Explore Universe</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
