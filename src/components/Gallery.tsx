import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: gallery1,
      alt: "Sara Diakité en concert à l'église",
      caption: "Concert spirituel - Bamako 2023",
      credit: "Photo: Studio Gospel Mali"
    },
    {
      src: gallery2,
      alt: "Portrait professionnel de Sara Diakité",
      caption: "Session portrait - Studio 2024",
      credit: "Photo: Professional Headshots"
    },
    {
      src: gallery3,
      alt: "Sara Diakité lors d'un concert en plein air",
      caption: "Festival Gospel - Abidjan 2023",
      credit: "Photo: Festival Gospel CI"
    }
  ];

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading text-center">Galerie</h2>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="divine-card cursor-pointer group overflow-hidden p-0"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-primary font-semibold text-sm">{image.caption}</p>
                    <p className="text-foreground/70 text-xs">{image.credit}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="relative max-w-4xl max-h-[90vh] mx-auto p-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 z-10 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-primary font-semibold">{images[currentImage].caption}</p>
              <p className="text-foreground/70 text-sm">{images[currentImage].credit}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;