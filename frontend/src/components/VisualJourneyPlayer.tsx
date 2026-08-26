import React, { useRef, useState } from 'react';
import { Play, Pause, RefreshCw, Layers, Award, Landmark } from 'lucide-react';

interface OverlayItem {
  time_seconds: number;
  title: string;
  subtitle: string;
  cost: string;
  saving: string;
}

interface VisualJourneyPlayerProps {
  videoUrl: string;
  overlays: OverlayItem[];
}

export const VisualJourneyPlayer: React.FC<VisualJourneyPlayerProps> = ({ videoUrl, overlays }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20); // Default placeholder

  // Fallback beautiful scenery loop video if URL is broken
  const resolvedVideoUrl = videoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-green-forest-and-river-42200-large.mp4';

  // Determine which overlay should be active based on current time
  // An overlay remains active for 3.5 seconds after its start time
  const activeOverlay = overlays.find(
    (item) => currentTime >= item.time_seconds && currentTime < item.time_seconds + 3.5
  ) || null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log("Video play error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 20);
    }
  };

  const seekTo = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      setCurrentTime(seconds);
      if (!isPlaying) {
        videoRef.current.play().catch(e => console.log("Video play error:", e));
        setIsPlaying(true);
      }
    }
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col space-y-4">
      <div className="flex justify-between items-center border-b border-brand-border pb-4">
        <div className="flex items-center space-x-3">
          <Layers className="h-6 w-6 text-brand-primary animate-pulse" />
          <div>
            <h2 className="text-xl font-bold font-sans text-glow-primary">Sequential Visual Journey</h2>
            <p className="text-xs text-gray-400">Cinematic previews with live student savings overlays</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 bg-brand-primary/10 border border-brand-primary/30 rounded text-brand-secondary font-semibold">
          AI Preview Active
        </span>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-brand-border group">
        <video
          ref={videoRef}
          src={resolvedVideoUrl}
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
        />

        {/* Video Overlay Layer */}
        {activeOverlay && (
          <div className="absolute top-4 left-4 right-4 bg-brand-dark/80 backdrop-blur-md border border-brand-primary/30 rounded-xl p-4 flex items-center justify-between shadow-2xl animate-fade-in z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-brand-primary/20 rounded-lg">
                <Landmark className="h-5 w-5 text-brand-secondary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{activeOverlay.title}</h4>
                <p className="text-xs text-gray-300 font-sans">{activeOverlay.subtitle}</p>
              </div>
            </div>
            
            <div className="text-right border-l border-brand-border pl-4">
              <span className="text-xs text-gray-400 font-semibold block">Cost to Student</span>
              <span className="text-sm font-bold text-brand-secondary">{activeOverlay.cost}</span>
              <div className="flex items-center text-[10px] text-brand-success font-bold mt-0.5">
                <Award className="h-3 w-3 mr-0.5" />
                <span>{activeOverlay.saving}</span>
              </div>
            </div>
          </div>
        )}

        {/* Dark overlay on pause */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition pointer-events-none">
            <div className="p-4 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-white backdrop-blur-sm animate-bounce-slow">
              <Play className="h-8 w-8 fill-current text-white" />
            </div>
          </div>
        )}

        {/* Custom Video Controls overlaying bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Custom Timeline Progress Bar */}
          <div className="timeline-track" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            seekTo(percentage * duration);
          }}>
            <div className="timeline-progress" style={{ width: `${progressPercentage}%` }} />
            {overlays.map((milestone, idx) => {
              const pos = (milestone.time_seconds / duration) * 100;
              return (
                <div
                  key={idx}
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-secondary border border-white hover:scale-150 transition cursor-pointer"
                  style={{ left: `${pos}%` }}
                  title={milestone.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    seekTo(milestone.time_seconds);
                  }}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-white text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={togglePlay} className="hover:text-brand-secondary transition">
                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <span>{Math.floor(currentTime)}s / {Math.floor(duration)}s</span>
            </div>
            <button onClick={() => seekTo(0)} className="hover:text-brand-secondary transition">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Quick Jumps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {overlays.map((item, idx) => (
          <button
            key={idx}
            onClick={() => seekTo(item.time_seconds)}
            className={`px-3 py-2 text-left rounded-xl border text-xs transition-all ${
              currentTime >= item.time_seconds && currentTime < item.time_seconds + 3.5
                ? 'bg-brand-primary/10 border-brand-primary text-brand-secondary'
                : 'bg-[#111622] border-brand-border text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="font-bold block text-white truncate">{item.title}</span>
            <span className="text-[10px] text-gray-400">Preview at {item.time_seconds}s</span>
          </button>
        ))}
      </div>
    </div>
  );
};
