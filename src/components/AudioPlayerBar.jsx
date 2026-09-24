import React, { useRef, useState, useEffect } from 'react';
import { useFandom } from '../context/FandomContext';
import { Play, Pause, X, Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayerBar = () => {
  const { audioPlayer, pauseAudio, resumeAudio, stopAudio } = useFandom();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (audioPlayer.isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
    } else {
      audioRef.current.pause();
    }
  }, [audioPlayer.isPlaying, audioPlayer.trackUrl]);

  if (!audioPlayer.trackUrl) return null;

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercent = Math.max(0, Math.min(1, clickX / width));
    audioRef.current.currentTime = newPercent * (audioRef.current.duration || 1);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#090e1c]/95 border-t border-purple-500/30 backdrop-blur-xl px-4 py-2.5 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <audio
        ref={audioRef}
        src={audioPlayer.trackUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={pauseAudio}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-sm">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-purple-950/60 border border-purple-500/30 flex-shrink-0 relative">
            <img
              src={audioPlayer.cover}
              alt={audioPlayer.trackTitle}
              className="w-full h-full object-cover"
            />
            {audioPlayer.isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-pink-400 h-full animate-bounce" />
                  <span className="w-0.5 bg-purple-400 h-2/3 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-0.5 bg-cyan-400 h-4/5 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col truncate">
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              {audioPlayer.trackTitle}
            </span>
            <span className="text-[11px] text-purple-300 truncate">
              {audioPlayer.artist}
            </span>
          </div>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="flex-1 max-w-xl flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button
              onClick={audioPlayer.isPlaying ? pauseAudio : resumeAudio}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white flex items-center justify-center shadow-lg shadow-purple-900/40 transition-transform transform hover:scale-105"
            >
              {audioPlayer.isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>
          </div>

          <div className="w-full flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <div
              onClick={handleSeek}
              className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={stopAudio}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
