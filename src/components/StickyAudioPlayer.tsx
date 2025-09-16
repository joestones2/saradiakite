import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  audio_url: string | null;
}

const StickyAudioPlayer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [tracks, setTracks] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('id, title, audio_url')
        .eq('is_featured', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTracks(data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    if (audioRef.current) {
      audioRef.current.src = tracks[next].audio_url || "";
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const prevTrack = () => {
    if (tracks.length === 0) return;
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);
    if (audioRef.current) {
      audioRef.current.src = tracks[prev].audio_url || "";
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showPlayer = () => setIsVisible(true);
  const hidePlayer = () => {
    setIsVisible(false);
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Initialize with first track
    if (tracks.length > 0) {
      audio.src = tracks[0].audio_url || "";
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    // Listen for custom events to show the player
    const handleShowPlayer = () => showPlayer();
    window.addEventListener('showAudioPlayer', handleShowPlayer);
    
    return () => {
      window.removeEventListener('showAudioPlayer', handleShowPlayer);
    };
  }, [tracks]);

  if (!isVisible || tracks.length === 0) return null;

  return (
    <div className="audio-player-sticky">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTrack}
              className="w-8 h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center justify-center"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground hover:scale-105 transition-transform flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              )}
            </button>
            
            <button
              onClick={nextTrack}
              className="w-8 h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center justify-center"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

            {/* Track info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">
                  {tracks[currentTrack]?.title || "Aucune chanson"}
                </h4>
                <p className="text-xs text-foreground/60 truncate">
                  Sara Diakité
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-foreground/50">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div 
              className="h-1 bg-border rounded-full cursor-pointer overflow-hidden"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Volume and close */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-primary" />
            <button
              onClick={hidePlayer}
              className="w-8 h-8 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};

// Helper function to show the player from other components
export const showAudioPlayer = () => {
  window.dispatchEvent(new CustomEvent('showAudioPlayer'));
};

export default StickyAudioPlayer;