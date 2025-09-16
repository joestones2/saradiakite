import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, ExternalLink, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Song {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  audio_url: string | null;
  spotify_url: string | null;
  download_url: string | null;
}

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [tracks, setTracks] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTracks(data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const togglePlay = (trackId: string) => {
    if (currentTrack === trackId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack !== trackId) {
        setCurrentTrack(trackId);
        if (audioRef.current) {
          audioRef.current.src = tracks.find(t => t.id === trackId)?.audio_url || "";
        }
      }
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  if (loading) {
    return (
      <section id="audio" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-heading text-center">Écouter</h2>
          <div className="text-center text-foreground/60">Chargement des chansons...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="audio" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Écouter</h2>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tracks.map((track) => (
            <div key={track.id} className="divine-card">
              <div className="flex items-start gap-4">
                {/* Play Button */}
                <button
                  onClick={() => togglePlay(track.id)}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform animate-gold-pulse"
                >
                  {currentTrack === track.id && isPlaying ? (
                    <Pause className="w-6 h-6" fill="currentColor" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  )}
                </button>

                {/* Track Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">{track.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{track.description}</p>
                  
                  {/* Progress Bar */}
                  {currentTrack === track.id && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-xs text-foreground/50 mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <div className="flex-1 h-1 bg-border rounded overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                          />
                        </div>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <span className="text-sm text-foreground/50 flex items-center gap-1">
                      <Volume2 className="w-4 h-4" />
                      {track.duration}
                    </span>
                    {track.download_url && (
                      <a 
                        href={track.download_url}
                        download
                        className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        Télécharger
                      </a>
                    )}
                    {track.spotify_url && (
                      <a 
                        href={track.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Spotify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
      </div>
    </section>
  );
};

export default AudioPlayer;