import { Play, ExternalLink } from "lucide-react";

const VideoSection = () => {
  const videos = [
    {
      id: "fJQ9GnbYdY4",
      title: "Duba bɛ na la",
      description: "Clip officiel de ce hymne puissant qui a conquis l'Afrique de l'Ouest",
      thumbnail: `https://img.youtube.com/vi/fJQ9GnbYdY4/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=fJQ9GnbYdY4"
    },
    {
      id: "6i9I-_NpQcU",
      title: "Yesu Kununa - Concert Live",
      description: "Performance live captivante lors d'un concert mémorable",
      thumbnail: `https://img.youtube.com/vi/6i9I-_NpQcU/maxresdefault.jpg`,
      url: "https://www.youtube.com/watch?v=6i9I-_NpQcU"
    },
    {
      id: "example1",
      title: "Worship Medley Live",
      description: "Médley de louange lors du Festival Gospel Abidjan 2023",
      thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=example1"
    },
    {
      id: "example2",
      title: "Behind the Scenes",
      description: "Dans les coulisses du tournage du clip 'Duba bɛ na la'",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=example2"
    }
  ];

  const openVideo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="videos" className="py-20 px-6 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Vidéos</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="divine-card p-0 overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={`Miniature de ${video.title}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback pour les images qui ne se chargent pas
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23198' opacity='0.1'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%23E89F3F' text-anchor='middle' dy='0.3em'%3EVideos Sara Diakité%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => openVideo(video.url)}
                    className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors animate-gold-pulse"
                  >
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </button>
                </div>

                {/* Duration badge */}
                <div className="absolute top-4 right-4 px-2 py-1 bg-background/80 rounded text-xs text-foreground">
                  Vidéo
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{video.title}</h3>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{video.description}</p>
                
                <button
                  onClick={() => openVideo(video.url)}
                  className="text-primary hover:text-accent transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir sur YouTube
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube Channel Link */}
        <div className="text-center mt-12">
          <a
            href="https://youtube.com/@saradiakite"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-divine inline-flex items-center gap-3"
          >
            <ExternalLink className="w-5 h-5" />
            Voir toutes les vidéos
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;