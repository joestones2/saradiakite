import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, ExternalLink, Volume2 } from "lucide-react";

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      id: 1,
      title: "Duba bɛ na la",
      description: "Un hymne puissant de louange en bambara qui célèbre la grandeur divine",
      duration: "4:32",
      audioUrl: "/files/duba_be_na_la.mp3", // Placeholder URL
      spotifyUrl: "https://open.spotify.com/track/example1",
      downloadUrl: "/files/duba_be_na_la.mp3"
    },
    {
      id: 2,
      title: "Yesu Kununa (Live)",
      description: "Performance live captivante qui transporte l'auditeur dans une atmosphère de recueillement",
      duration: "5:18",
      audioUrl: "/files/yesu_kununa.mp3", // Placeholder URL
      spotifyUrl: "https://open.spotify.com/track/example2",
      downloadUrl: "/files/yesu_kununa.mp3"
    }
  ];

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentTrack !== trackId) {
        setCurrentTrack(trackId);
        if (audioRef.current) {
          audioRef.current.src = tracks.find(t => t.id === trackId)?.audioUrl || "";
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
                    <a 
                      href={track.downloadUrl}
                      download
                      className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </a>
                    <a 
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Spotify
                    </a>
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