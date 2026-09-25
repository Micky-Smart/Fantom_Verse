import React from 'react';
import { useFandom } from '../context/FandomContext';
import { X, ExternalLink } from 'lucide-react';

export const MediaViewerModal = () => {
  const { activeVideo, setActiveVideo } = useFandom();

  if (!activeVideo) return null;

  const youtubeId = activeVideo.youtubeId?.trim();
  const youtubeOrigin = window.location.protocol === 'http:' || window.location.protocol === 'https:'
    ? window.location.origin
    : null;
  const embedUrl = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&rel=0${youtubeOrigin ? `&origin=${encodeURIComponent(youtubeOrigin)}` : ''}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
              {activeVideo.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={youtubeId ? `https://www.youtube.com/watch?v=${encodeURIComponent(youtubeId)}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs flex items-center gap-1"
              title="Watch on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setActiveVideo(null)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Responsive Video Container */}
        <div className="relative aspect-video w-full bg-black">
          {embedUrl ? <iframe
            src={embedUrl}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : (
            <p className="flex h-full items-center justify-center px-6 text-center text-sm text-white/80">
              This video is unavailable.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
